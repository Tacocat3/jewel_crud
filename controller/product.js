const { sequelize } = require("../models");
const { QueryTypes } = require("sequelize");

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
module.exports.modifyProductInfo = async (req, res) => {
  await modifyProductInfo(req, res);
};

//상품 삭제하기
module.exports.deleteProduct = async (req, res) => {
  await deleteProduct(req, res);
};

async function addProduct(req, res) {
  try {
    const storeId = req.body.storeId;
    const brandName = req.body.brandName;
    const productName = req.body.productName;
    const originalPrice = req.body.price;
    const discount = req.body.discount;
    const isTodayDelivery = req.body.isTodayDelivery;
    const category = req.body.category;
    const subcategory = req.body.subcategory;
    const base = req.body.base;
    const color = req.body.color;
    const gemstone = req.body.gemstone;
    const shape = req.body.shape;

    const createProduct = await sequelize.query(
      `INSERT INTO products (storeId, brandName, productName, discount, originalPrice, isTodayDelivery)
       VALUES (?, ?, ?, ?, ?, ?);`,
      {
        replacements: [
          storeId,
          brandName,
          productName,
          discount,
          originalPrice,
          isTodayDelivery,
        ],
        type: QueryTypes.INSERT,
      }
    );

    res.status(200).json({
      createProduct,
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

async function showProductsList(req, res) {
  try {
    const category = req.query.category || null;
    const subcategory = req.query.subcategory || null;
    const isTodayDelivery = req.query.isTodayDelivery || null;
    const store = req.query.store || null;
    const base = req.query.base || null;
    const shape = req.query.shape || null;
    const gemstone = req.query.gemstone || null;
    const color = req.query.color || null;
    const discount = req.query.discount || null;
    const price = req.query.price || null;
    let preparedSql = `SELECT * FROM products p
      LEFT JOIN categories cg ON cg.productId = p.productId
      LEFT JOIN subcategories scg ON scg.categoryId = cg.categoryId
      RIGHT JOIN stores s ON s.storeId = p.storeId
      LEFT JOIN bases b ON b.productId = p.productId
      LEFT JOIN shapes s2 ON s2.productId = p.productId
      LEFT JOIN gemstones g ON g.productId = p.productId
      LEFT JOIN colors c ON c.productId = p.productId
      `;
    let where_condition = [];
    let finalQuery = [];
    let replacements = [];

    const where = "WHERE";

    finalQuery.push(preparedSql);

    if (category) {
      where_condition.push(`cg.categoryId IN (?)`);
      replacements.push(category);
    }
    if (subcategory) {
      where_condition.push(`scg.subcategoryId IN (?)`);
      replacements.push(subcategory);
    }
    if (isTodayDelivery) {
      where_condition.push(`p.isTodayDelivery = ?`);
      replacements.push(isTodayDelivery);
    }
    if (store) {
      where_condition.push(`s.storeId IN (?)`);
      replacements.push(store);
    }
    if (base) {
      where_condition.push(`b.baseId IN (?)`);
      replacements.push(base);
    }
    if (shape) {
      where_condition.push(`s2.baseId IN (?)`);
      replacements.push(shape);
    }
    if (gemstone) {
      where_condition.push(`g.gemstoneId IN (?)`);
      replacements.push(gemstone);
    }
    if (color) {
      where_condition.push(`c.colorId IN (?)`);
      replacements.push(color);
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
        `(p.originalPrice - (p.originalPrice * (p.discount/100))) AS RealPrice Between ? AND ?`
      );
      replacements.push(priceFrom, priceTo);
    }

    finalQuery.push(where + where_condition.join(" AND ")).join("");

    res.status(200).json({
      finalQuery,
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
      `SELECT * FROM products p
    LEFT JOIN categories cg ON cg.productId = p.productId
    LEFT JOIN subcategories scg ON scg.categoryId = cg.categoryId
    RIGHT JOIN stores s ON s.storeId = p.storeId
    LEFT JOIN bases b ON b.productId = p.productId
    LEFT JOIN shapes s2 ON s2.productId = p.productId
    LEFT JOIN gemstones g ON g.productId = p.productId
    LEFT JOIN colors c ON c.productId = p.productId
    WHERE p.productId = ?
    ;`,
      {
        replacements: [productId],
        type: QueryTypes.SELECT,
      }
    );

    res.status(200).json({
      productDetail,
      ok: true,
      message: "successfully loaded"
    })
  } catch (error) {
    res.status(400).json({
      ok: false,
      message: "Invalid request"
    })
  }
}

async function modifyProductInfo(req, res) {
  try {
    const productId = req.params.productId
    const modifyQuery = await sequelize.query(
      `UPDATE products p
      LEFT JOIN categories cg ON cg.productId = p.productId
      LEFT JOIN subcategories scg ON scg.categoryId = cg.categoryId
      RIGHT JOIN stores s ON s.storeId = p.storeId
      LEFT JOIN bases b ON b.productId = p.productId
      LEFT JOIN shapes s2 ON s2.productId = p.productId
      LEFT JOIN gemstones g ON g.productId = p.productId
      LEFT JOIN colors c ON c.productId = p.productId
      WHERE p.productId = ? `
    )
  } catch (error) {
    
  }
}

async function deleteProduct(req, res) {
  try {
    const productId = req.params.productId
    const deleteQuery = await sequelize.query(
      `DELETE FROM products
      WHERE productId = ?;`,
      {
        replacements: [productId],
        type: QueryTypes.DELETE,
      }
    )
    
    res.status(200).json({
      deleteQuery,
      ok:true,
      message: "successfully deleted"
    })
  } catch (error) {
    res.status(400).json({
      ok: false,
      message: "Invalid request"
    })
  }
}
