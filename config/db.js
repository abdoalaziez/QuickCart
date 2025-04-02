// import mongoose from "mongoose";
// import { connect } from "mongoose";


// const cached = global.mongoose;


// if(!cached){
//     cached = global.mongoose ={conn: null, promise: null}
// }

// async function connectDB() {
   
//     if(cached.conn){
// return cached.conn
//     }
//     if (!cached.promise) {
//         const opts ={
//             bufferCommands:false
//         }
//         cached.promise = mongoose.connect(`${process.env.MONGODB_URI}/quickcart`, opts).then(mongoose  => {
//             return mongoose
//         })
//     }
// cached.conn = await  cached.promise

// return cached.conn
// }


// export default connectDB





import mongoose from "mongoose"; // استيراد مكتبة mongoose

// التحقق مما إذا كان هناك اتصال سابق مخزن في globalThis.mongoose
let cached = globalThis.mongoose;
if (!cached) {
    cached = globalThis.mongoose = { conn: null, promise: null };
}

// دالة الاتصال بقاعدة البيانات
async function connectDB() {
    if (cached.conn) return cached.conn; // إذا كان هناك اتصال موجود، يتم إرجاعه مباشرةً

    if (!cached.promise) { // إذا لم يكن هناك طلب اتصال سابق
        const opts = { bufferCommands: false }; // تعطيل تخزين الأوامر في الذاكرة
        cached.promise = mongoose.connect(`${process.env.MONGODB_URI}/quickcart`, opts)
            .then((mongoose) => mongoose); // الاتصال بقاعدة البيانات
    }

    cached.conn = await cached.promise; // تخزين الاتصال في `cached.conn`
    return cached.conn; // إرجاع الاتصال الفعلي
}

export default connectDB; // تصدير وظيفة الاتصال
