// import { serve } from "inngest/next";
// import { inngest, syncUserCreation, syncUserDeletion, syncUserUpdation } from "@/config/inngest";

// // Create an API that serves zero functions
// export const { GET, POST, PUT } = serve({
//   client: inngest,
//   functions: [
//     syncUserCreation,
//     syncUserUpdation,
//     syncUserDeletion,
//   ],
// });




import { serve } from "inngest/next"; // استيراد `serve` من مكتبة Inngest
import { inngest, syncUserCreation, syncUserDeletion, syncUserUpdation } from "@/config/inngest"; // استيراد الوظائف التي تم إنشاؤها

// إنشاء API تتعامل مع أحداث Clerk
export const { GET, POST, PUT } = serve({
  client: inngest, // تعيين `Inngest` كعميل للمعالجة
  functions: [
    syncUserCreation, // معالجة حدث إنشاء المستخدم
    syncUserUpdation, // معالجة حدث تحديث المستخدم
    syncUserDeletion, // معالجة حدث حذف المستخدم
  ],
});
