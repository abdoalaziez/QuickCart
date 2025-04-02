// import { Inngest } from "inngest";
// import connectDB from "./db";
// import User from "@/models/User";

// // Create a client to send and receive events
// export const inngest = new Inngest({ id: "my-app" });



//  export  const syncUserCreation = inngest.CreateFunction(
//     {
//         id: 'sync-user-from-clerk'
//     },
//     {
//         event: 'clerk/user.created'
//     },
//     async ({event}) =>{
//      const { id, first_name, last_name, email_addresses,  image_url } = event.data
//      const userData = {
//       _id:id,
//       email: email_addresses[0].email_address,
//       name: first_name +  '  ' + last_name,
//       imageUrl: image_url
//      }
//      await connectDB()
//      await User.craete(userData)
//     }
//  )


//  export const syncUserUpdation = inngest.createFunction(
//     {
//     id: 'update-user-from-clerk'
//     },
//     {event: 'clerk/user-updated'},
//     async ({event}) =>{
//         const { id, first_name, last_name, email_addresses,  image_url } = event.data
//         const userData = {
//          _id:id,
//          email: email_addresses[0].email_address,
//          name: first_name +  '  ' + last_name,
//          imageUrl: image_url
//         }
//         await connectDB()
//         await User.finByIdAndUpdate(id, userData)
//     }
//  )


//  export const syncUserDeletion = inngest.createFunction(
//     {
//         id: 'delete-user-with-clerk'
//     },
//     {event: 'clerk/user-deleted'},
//     async ({event}) =>{
//     const  {id} = event.data
    

//     await connectDB()
//     await User.finByIdAndDelete(id)
//     }
//  )





import { Inngest } from "inngest"; // استيراد مكتبة Inngest لإنشاء الأحداث
import connectDB from "./db"; // استيراد وظيفة الاتصال بقاعدة البيانات
import User from "@/models/User"; // استيراد نموذج المستخدم

// إنشاء كائن Inngest لإرسال واستقبال الأحداث
export const inngest = new Inngest({ id: "my-app" });

/**
 * الحدث: مزامنة إنشاء المستخدم عند التسجيل في `Clerk`
 */
export const syncUserCreation = inngest.createFunction(
    { id: 'sync-user-from-clerk' }, // معرف الحدث
    { event: 'clerk/user.created' }, // نوع الحدث القادم من Clerk
    async ({ event }) => {
        // استخراج البيانات من الحدث
        const { id, first_name, last_name, email_addresses, image_url } = event.data;
        const userData = {
            _id: id, // تعيين id المستخدم
            email: email_addresses[0].email_address, // تعيين البريد الإلكتروني
            name: `${first_name} ${last_name}`, // دمج الاسم الأول والأخير
            imageUrl: image_url // حفظ رابط الصورة الشخصية
        };
        await connectDB(); // الاتصال بقاعدة البيانات
        await User.create(userData); // إنشاء المستخدم في قاعدة البيانات
    }
);

/**
 * الحدث: تحديث بيانات المستخدم عند تعديلها في `Clerk`
 */
export const syncUserUpdation = inngest.createFunction(
    { id: 'update-user-from-clerk' }, // معرف الحدث
    { event: 'clerk/user.updated' }, // نوع الحدث
    async ({ event }) => {
        // استخراج البيانات الجديدة من الحدث
        const { id, first_name, last_name, email_addresses, image_url } = event.data;
        const userData = {
            name: `${first_name} ${last_name}`, // تحديث الاسم
            email: email_addresses[0].email_address, // تحديث البريد الإلكتروني
            imageUrl: image_url // تحديث الصورة الشخصية
        };
        await connectDB(); // الاتصال بقاعدة البيانات
        await User.findByIdAndUpdate(id, userData); // تحديث بيانات المستخدم في قاعدة البيانات
    }
);

/**
 * الحدث: حذف المستخدم عند إزالته من `Clerk`
 */
export const syncUserDeletion = inngest.createFunction(
    { id: 'delete-user-with-clerk' }, // معرف الحدث
    { event: 'clerk/user.deleted' }, // نوع الحدث
    async ({ event }) => {
        const { id } = event.data; // استخراج معرف المستخدم المحذوف

        await connectDB(); // الاتصال بقاعدة البيانات
        await User.findByIdAndDelete(id); // حذف المستخدم من قاعدة البيانات
    }
);
