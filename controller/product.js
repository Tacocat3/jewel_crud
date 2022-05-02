const { sequelize } = require("../models");
const { QueryTypes } = require("sequelize");
const productImage = require("../models/productImage");

//상품 등록하기
module.exports.addProduct = async (req, res) => {
  await addProduct(req, res);
};

//상품 목록 조회하기
module.exports.showProductsList = async (req, res) => {
  await showProductsList(req, res);
};

//상품 상세 조회하기
module.exports.showProductDetail = async (req, res) => {
  await showProductDetail(req, res);
};

//상품 정보 수정하기
module.exports.modifyingProduct = async (req, res) => {
  await modifyingProduct(req, res);
};

//상품 삭제하기
module.exports.deleteProduct = async (req, res) => {
  await deleteProduct(req, res);
};

async function addProduct(req, res) {
  try {
    const brandName = req.body.brandName;
    const productName = req.body.productName;
    const originalPrice = req.body.price;
    const discount = req.body.discount;
    const isTodayDelivery = req.body.isTodayDelivery;
    const subCategoryIds = req.body.subCategoryIds;
    const colorIds = req.body.colorIds;
    const productmage = req.files
    console.log(req.files)

    // if (
    //   !brandName ||
    //   !productName ||
    //   !originalPrice ||
    //   !discount ||
    //   !isTodayDelivery ||
    //   !subCategoryIds ||
    //   !colorIds ||
    //   !productImage
    // ) {
    //   return res.status(400).json({
    //     ok: false,
    //     errorMessage: "need to fullfil every fields",
    //   });
    // }

    const createProduct = await sequelize.query(
      `INSERT INTO products (brandName, productName, discount, originalPrice, isTodayDelivery)
       VALUES (?, ?, ?, ?, ?);`,
      {
        replacements: [
          brandName,
          productName,
          discount,
          originalPrice,
          isTodayDelivery,
        ],
        type: QueryTypes.INSERT,
      }
    );
    const productId = createProduct[0];
    const colorIdArr = await colorIds.split(",").map(Number);
    colorIdArr.forEach(async (colorId) => {
      const createColors_products = await sequelize.query(
        `INSERT INTO color_products (colorId, productId)
        VALUES (?,?);`,
        {
          replacements: [colorId, productId],
          type: QueryTypes.INSERT,
        }
      );
      return createColors_products;
    });

    const subCategoryIdArr = await subCategoryIds.split(",").map(Number);
    subCategoryIdArr.forEach(async (subCategoryId) => {
      const createSubcategories_products = await sequelize.query(
        `INSERT INTO subcategories_products (subCategoryId, productId)
        VALUES (?,?);`,
        {
          replacements: [subCategoryId, productId],
          type: QueryTypes.INSERT,
        }
      );
      return createSubcategories_products;
    });
 
    res.status(200).json({
      ok: true,
      message: "creation success",
    });
  } catch (error) {
      console.error(error);
    res.status(400).json({
      ok: false,
      errorMessage: "creation failed",
    });
  }
}

const productMainImageArr = productImage.main.forEach(async (data) => {
  
})
console.log(productMainImageArr)

async function showProductsList(req, res) {
  try {
    const categoryIds = req.query.categoryIds || null;
    const subCategoryIds = req.query.subCategoryIds || null;
    const isTodayDelivery = req.query.isTodayDelivery || null;
    const colorIds = req.query.colorIds || null;
    const discount = req.query.discount || null;
    const price = req.query.price || null;
    let preparedSql = `SELECT p.* FROM products p
    LEFT JOIN color_products cp ON cp.productId = p.productId
    LEFT JOIN colors c ON c.colorId = cp.colorId
    LEFT JOIN subcategories_products scp ON scp.productId = p.productId
    LEFT JOIN subcategories scg ON scp.subCategoryId = scg.subCategoryId
    LEFT JOIN categories cg ON cg.categoryId = scg.categoryId
      `;
    let where_condition = [];
    let finalQuery = [];
    let replacements = [];

    const where = "WHERE ";

    finalQuery.push(preparedSql);

    if (categoryIds) {
      where_condition.push(`cg.categoryId IN (?)`);
      replacements.push(categoryIds);
    }
    if (subCategoryIds) {
      where_condition.push(`scg.subCategoryId IN (?)`);
      replacements.push(subCategoryIds);
    }
    if (isTodayDelivery) {
      where_condition.push(`p.isTodayDelivery = ?`);
      replacements.push(isTodayDelivery);
    }
    if (colorIds) {
      where_condition.push(`c.colorId IN (?)`);
      replacements.push(colorIds.split(",").map(Number));
    }
    if (discount) {
      where_condition.push(`p.discount >= ?`);
      replacements.push(discount);
    }
    if (price) {
      const priceRange = price.split("|");
      const priceFrom = priceRange[0];
      const priceTo = priceRange[1];
      where_condition.push(
        `(p.originalPrice - (p.originalPrice * (p.discount/100))) Between ? AND ?`
      );
      replacements.push(priceFrom, priceTo);
    }

    if (where_condition.length > 0) {
      finalQuery.push(where + where_condition.join(" AND "));
    }
    finalQuery.push(`GROUP BY p.productId;`);
    preparedSql = finalQuery.join(" ");

    const showProductsListResult = await sequelize.query(preparedSql, {
      replacements,
      type: QueryTypes.SELECT,
    });

    const isProductListExist = showProductsListResult[0].productId

    if(!isProductListExist){
      return res.status(400).json({
        ok: false,
        errorMessage: "There is no corresponding Data",
      });
    }

    res.status(200).json({
      showProductsListResult,
      ok: true,
      message: "successfully loaded",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      ok: false,
      errorMessage: "Invalid request",
    });
  }
}

async function showProductDetail(req, res) {
  try {
    const productId = req.params.productId;
    const productDetail = await sequelize.query(
      `SELECT p.*, JSON_ARRAYAGG(c.name) AS colors FROM products p
      LEFT JOIN color_products cp ON cp.productId = p.productId
      LEFT JOIN colors c ON c.colorId = cp.colorId
      LEFT JOIN subcategories_products scp ON scp.productId = p.productId
      LEFT JOIN subcategories scg ON scp.subCategoryId = scg.subCategoryId
      LEFT JOIN categories cg ON cg.categoryId = scg.categoryId
      WHERE p.productId = ?
    ;`,
      {
        replacements: [productId],
        type: QueryTypes.SELECT,
      }
    );

    const isProductExist = productDetail[0].productId

    if(!isProductExist){
      return res.status(400).json({
        ok: false,
        errorMessage: "There is no corresponding Data",
      });
    }

    res.status(200).json({
      productDetail,
      ok: true,
      message: "successfully loaded",
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      errorMessage: "Invalid request",
    });
  }
}

async function modifyingProduct(req, res) {
  try {
    const productId = parseInt(req.params.productId);
    const brandName = req.body.brandName;
    const productName = req.body.productName;
    const originalPrice = req.body.originalPrice;
    const discount = req.body.discount;
    const isTodayDelivery = req.body.isTodayDelivery;
    const subCategoryIds = req.body.subCategoryIds;
    const colorIds = req.body.colorIds;

    const modifyingProduct = await sequelize.query(
      `UPDATE products p
      SET p.brandName = ?,
            p.productName = ?,
            p.discount = ?,
            p.originalPrice = ?,
            p.isTodayDelivery = ?,
            p.updatedAt = now()
      WHERE productId = ?;`,
      {
        replacements: [
          brandName,
          productName,
          discount,
          originalPrice,
          isTodayDelivery,
          productId,
        ],
        type: QueryTypes.UPDATE,
      }
    );
    const deleteColor_products = await sequelize.query(
      `DELETE FROM color_products
      WHERE productId = ?;`,
      {
        replacements: [productId],
        type: QueryTypes.DELETE,
      }
    );

    const colorIdArr = await colorIds.split(",").map(Number);
    colorIdArr.forEach(async (colorId) => {
      const remakeColor_products = await sequelize.query(
        `INSERT INTO color_products (colorId, productId)
        VALUES (?, ?);`,
        {
          replacements: [colorId, productId],
          type: QueryTypes.INSERT,
        }
      );
      return remakeColor_products;
    });

    const deleteSubcategories_products = await sequelize.query(
      `DELETE FROM subcategories_products
      WHERE productId = ?;`,
      {
        replacements: [productId],
        type: QueryTypes.DELETE,
      }
    );

    const subCategoryIdArr = await subCategoryIds.split(",").map(Number);
    subCategoryIdArr.forEach(async (subCategoryId) => {
      const remakeSubcategories_products = await sequelize.query(
        `INSERT INTO subcategories_products (subCategoryId, productId)
        VALUES (?, ?);`,
        {
          replacements: [subCategoryId, productId],
          type: QueryTypes.INSERT,
        }
      );
      return remakeSubcategories_products;
    });

    res.status(200).json({
      ok: true,
      message: "modifying success",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      ok: false,
      errorMessage: "modifying failed",
    });
  }
}

async function deleteProduct(req, res) {
  try {
    const productId = req.params.productId;

    const selectQuery = await sequelize.query(
      `SELECT * FROM products
      WHERE productId = ?`,
      {
        replacements: [productId],
        type: QueryTypes.SELECT,
      }
    )

    console.log(selectQuery.length)
    
    if (selectQuery.length <= 0) {
      return res.status(400).json({
        ok: false,
        errorMessage: "There is no corresponding Data",
      })
    }

    const deleteQuery = await sequelize.query(
      `DELETE FROM products
      WHERE productId = ?;`,
      {
        replacements: [productId],
        type: QueryTypes.DELETE,
      }
    );

    res.status(200).json({
      deleteQuery,
      ok: true,
      message: "successfully deleted",
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      errorMessage: "Invalid request",
    });
  }
}
