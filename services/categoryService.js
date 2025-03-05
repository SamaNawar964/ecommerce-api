const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const Category = require('../models/CategoryModel');

// ✅ جلب جميع الفئات
exports.getCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;

  const categories = await Category.find({}).skip(skip).limit(limit);
  res.status(200).json({ results: categories.length, page, data: categories });
});

// ✅ جلب فئة معينة بالـ ID
exports.getCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  if (!category) {
    return res.status(404).json({ msg: `No category for this id ${id}` });
  }
  res.status(200).json({ data: category });
});

// ✅ إنشاء فئة جديدة مع التحقق من التكرار
exports.createCategory = asyncHandler(async (req, res) => {
  const name = req.body.name;

  // 🔍 التحقق مما إذا كانت الفئة موجودة بالفعل
  const existingCategory = await Category.findOne({ name });
  if (existingCategory) {
    return res.status(400).json({ 
      success: false, 
      message: "Category already exists" 
    });
  }

  const category = await Category.create({ name, slug: slugify(name) });
  res.status(201).json({ success: true, data: category });
});

// ✅ تحديث فئة معينة مع تحديث slug
exports.updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const category = await Category.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );

  if (!category) {
    return res.status(404).json({ msg: `No category for this id ${id}` });
  }
  res.status(200).json({ data: category });
});

// ✅ حذف فئة معينة (تم إصلاح المشكلة)
exports.deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await Category.findByIdAndDelete(id);

  if (!category) {
    return res.status(404).json({ msg: `No category for this id ${id}` });
  }
  res.status(200).json({ success: true, msg: 'Category deleted successfully' }); // ✅ تم تعديل الاستجابة
});
