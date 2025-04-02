// import mongoose from "mongoose";


// const userSchema = new mongoose.Schema({
//     _id:{typeof: String, required:true},
//     name: {typeof: String, required:true},
//     email: {typeof: String, required:true, unique:true},
//     imageUrl: {typeof: String, required:true},
//     cartItems:{typeof:Object, default: {}}
// }, {minimize: false})


// const User = mongoose.model.user || mongoose.model('user', userSchema)


// export default User





import mongoose from "mongoose"; // استيراد مكتبة mongoose للتعامل مع MongoDB

// تعريف مخطط (Schema) المستخدم
const userSchema = new mongoose.Schema({
    _id: { type: String, required: true }, // تعريف _id كمفتاح أساسي من نوع String وإلزامي
    name: { type: String, required: true }, // اسم المستخدم مطلوب
    email: { type: String, required: true, unique: true }, // البريد الإلكتروني مطلوب ويجب أن يكون فريدًا
    imageUrl: { type: String, required: true }, // رابط الصورة الشخصية للمستخدم مطلوب
    cartItems: { type: Object, default: {} } // بيانات سلة المشتريات، وهي اختيارية وتكون فارغة افتراضيًا
}, { minimize: false }); // تعطيل خاصية تقليل الكائنات الفارغة في MongoDB

// إنشاء النموذج (Model) إذا لم يكن موجودًا مسبقًا
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User; // تصدير النموذج لاستخدامه في أماكن أخرى من التطبيق
