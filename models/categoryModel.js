const mongoose = require('mongoose');
const slugify = require('slugify');

// 1️⃣ - إنشاء الـ Schema
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      unique: true, // ✅ منع التكرار
      minlength: [3, 'Too short category name'],
      maxlength: [32, 'Too long category name'],
    },
    slug: {
      type: String,
      lowercase: true,
      unique: true, // ✅ ضمان عدم تكرار الـ slug أيضًا
    },
    image: String,
  },
  { timestamps: true, autoIndex: true } // ✅ تمكين الفهرسة التلقائية
);

// ✅ إضافة فهرس لحقل name لمنع التكرار
categorySchema.index({ name: 1 }, { unique: true });

// ✅ Middleware لتحديث الـ slug تلقائيًا عند تعديل الاسم
categorySchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, { lower: true });
  }
  next();
});

// ✅ Middleware لتحديث الـ slug تلقائيًا عند التحديث
categorySchema.pre('findOneAndUpdate', function (next) {
  let update = this.getUpdate();
  if (update.name) {
    update.slug = slugify(update.name, { lower: true });
  }
  this.setOptions({ runValidators: true }); // ✅ التأكد من التحقق من القيم عند التحديث
  next();
});

// 2️⃣ - إنشاء الـ Model
const CategoryModel = mongoose.model('Category', categorySchema);

module.exports = CategoryModel;
