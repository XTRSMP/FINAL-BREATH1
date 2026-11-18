# FINAL BREATH STORE — FBT

## التشغيل على Windows
1. ثبّت Node.js LTS.
2. افتح PowerShell داخل مجلد المشروع.
3. نفّذ `npm install`.
4. انسخ `.env.example` إلى `.env`، ثم ضع قيمة طويلة وعشوائية في `SESSION_SECRET`.
5. لإشعارات Discord: أضف رابط Webhook جديد لروم الطلبات في `ORDERS_WEBHOOK_URL` ورابط Webhook جديد لروم العملات في `TOPUPS_WEBHOOK_URL`. بديلًا عن ذلك، يمكن وضع `DISCORD_BOT_TOKEN` واستخدام معرفات الرومات من إعدادات المالك.
6. نفّذ `npm start` وافتح `http://localhost:3000`.

## بيانات المشروع الحالية
- قاعدة البيانات الحالية `store.db` مرفقة كما هي مع بيانات الحسابات والمنتجات والطلبات والأرصدة.
- حساب `HAGED` موجود بدور `owner`، وتم تعيين كلمة المرور التجريبية المطلوبة وتخزينها كـ bcrypt hash داخل قاعدة البيانات.
- لا توجد كلمة مرور افتراضية في الكود، ولا يتم إنشاء مالك تلقائيًا.
- المنتجات المخفية القديمة محفوظة ويمكن للمالك إعادة نشرها من إدارة المنتجات.

## المزايا التي تم تفعيلها
- واجهة العملاء: المنتجات، السلة، المحفظة، المشتريات، حالة الطلب، والرتبة.
- لوحة المالك المحمية من جهة السيرفر: إدارة المنتجات وإظهارها/إخفاؤها وتعديلها، إدارة الأرصدة، الرتب، الحظر، مراجعة الطلبات وطلبات الشحن، أكواد الخصم، إعدادات InstaPay وباقات FBT.
- الرتب: MEMBER وVIP وPREMIUM وSELLER وOWNER، مع BANNED للحساب المحظور.
- الحظر المؤقت ينتهي تلقائيًا عند انتهاء مدته، والحظر الدائم لا ينتهي إلا بفك الحظر من المالك.
- طلبات FBT تحجز الرصيد، وعند رفضها يرجع الرصيد تلقائيًا مرة واحدة. قبول الطلب يثبت الخصم.
- طلب شحن FBT لا يضيف العملات إلا بعد قبول المالك، والبونص يضاف وقت القبول.
- أكواد الخصم تدعم نسبة مئوية أو قيمة ثابتة وحد استخدام اختياري.
- تنبيهات Discord ترسل بيانات الطلب/الشحن مع منشن المعرّف المحدد في إعدادات المتجر.

## نقاط إعداد Discord والدفع
- Webhook يرسل رسائل إلى الروم الذي أنشأته منه؛ لذلك إذا استخدمت Webhook فلا تحتاج إلى Bot Token.
- إذا استخدمت `DISCORD_BOT_TOKEN`، امنح البوت صلاحية إرسال الرسائل إلى الرومات، ثم أدخل Channel IDs في إعدادات المالك.
- معرفات الرومات المسجلة مبدئيًا: الطلبات `1572026206591914066`، وشحن العملات `1572046665140142120`. معرف منشن طلبات العملات `1534423663028207668`.
- أزرار قبول/رفض الطلبات والشحن داخل Discord مضافة. اضبط Interactions Endpoint URL إلى https://YOUR-DOMAIN/api/discord/interactions، وضع DISCORD_PUBLIC_KEY من Developer Portal في .env، مع استخدام Bot Token أو Webhook لإرسال الرسائل. يجب أن يكون الموقع متاحًا عبر HTTPS عام حتى تصل تفاعلات Discord.
- أدخل بيانات InstaPay الفعلية من لوحة المالك. إثبات التحويل يظل مراجعة يدوية ولا يتحقق الموقع تلقائيًا من وصول الأموال.

## الأمان قبل النشر العام
- غيّر `SESSION_SECRET` إلى قيمة عشوائية قوية.
- استخدم HTTPS وSession Store دائمًا وحدود محاولات تسجيل الدخول ونسخًا احتياطية لقاعدة البيانات.
- لا تشارك ملف `.env` أو ترفعه إلى GitHub.
- لا ترفع `store.db` إلى GitHub؛ يحتوي على بيانات العملاء وأرصدة المتجر.
- روابط Webhook أسرار؛ إذا سبق مشاركتها علنًا فقم بعمل Regenerate لها من Discord.

## ملاحظات النسخة المعدلة
- باقات FBT يمكن إضافتها وحذفها وتعديلها، والحفظ يزامن القائمة بالكامل.
- المنتجات تدعم الدولار أو FBT أو الاثنين، مع اختيار العملة في السلة.
- صور المنتجات لها معاينة قبل النشر وتحكم في موضع القص.
- تقييم نجوم لكل منتج، وبحث مباشر في قائمة العملاء، ولوحة TOP 100.
- إشعارات Discord تعرض أزرار قبول/رفض، ويلزم ضبط `DISCORD_PUBLIC_KEY` وInteractions Endpoint على رابط HTTPS العام.
- عند نقل المشروع إلى جهاز آخر نفّذ `npm install` لإعادة بناء مكتبة SQLite المناسبة لنظام التشغيل، ولا تنقل `node_modules` بين Windows وLinux.


## Discord approvals (Accept / Reject buttons)

For interactive approval buttons, configure these variables in the hosting provider's environment:
- `DISCORD_BOT_TOKEN`: token for the Discord application bot.
- `DISCORD_PUBLIC_KEY`: Public Key from Discord Developer Portal > General Information.
- `ORDERS_WEBHOOK_URL` and `TOPUPS_WEBHOOK_URL` may remain configured as fallback notification destinations.

Set the Discord application's Interactions Endpoint URL to:
`https://YOUR-DOMAIN/api/discord/interactions`

The bot must have permission to view the target channels and send messages. The store sends product-order notifications to the configured `orders_channel_id` and top-up notifications to `topups_channel_id`. The default channel IDs in the database are the IDs requested for this update. Approval permissions are restricted to the specified role IDs (and the configured store owner account).


## التعديلات في هذه النسخة
- حساب HAGED محفوظ بدور OWNER، ولم يتم تصفير قاعدة البيانات أو تعديل أرصدة/سجلات الحسابات.
- تم تفعيل مساحة SELLER للعرض فقط: طلبات المنتجات، قائمة المنتجات، وسجل العملات. لا تظهر للبائع إدارة العملاء أو الشحن أو الإعدادات ولا يملك صلاحيات تعديل البيانات.
- تمييز المراكز الثلاثة الأولى في TOP 100 بتصميم ذهبي/فضي/برونزي، مع إبراز HAGED في المنتصف بصريًا دون تغيير ترتيب النقاط الفعلي.
- عرض أسعار USD وFBT تحت بعضهما في بطاقات المنتجات ذات السعرين، وإضافة بطاقات VIP وPREMIUM وSELLER إلى الرئيسية.
- صلاحيات تغيير بيانات الموقع وإدارة المنتجات والمستخدمين تظل محمية للمالك من جهة السيرفر.

## ملاحظة اختبار التشغيل
تم فحص صياغة JavaScript وفحص سلامة قاعدة SQLite. لم يمكن تشغيل الخادم في بيئة الفحص الحالية لأن مجلد `node_modules` المرفق يحتوي على ملف `better-sqlite3` ثنائي مخصص لنظام تشغيل مختلف؛ على جهاز التشغيل نفّذ `npm install` داخل مجلد المشروع لإعادة بناء التبعيات المناسبة للنظام قبل `npm start`.


## نظام شراء رتب VIP و PREMIUM (FBT 2.1)
- بطاقتا VIP وPREMIUM في الرئيسية تفتحان نموذج شراء مباشر بدون السلة.
- السعر بالدولار، ويمكن للمالك تعديله أو إيقاف بيع كل رتبة من إعدادات المتجر.
- كل طلب يتطلب اسم Discord وDiscord User ID وصورة إثبات الدفع وطريقة الدفع.
- يصل الطلب إلى روم الطلبات مع صورة الإثبات وزري موافقة/رفض، مع منشن المالك المحدد في `discord_owner_id`.
- لا تُمنح الرتبة إلا بعد موافقة المالك من Discord. عند الموافقة يضيف البوت رتبة Discord المحددة ويحدّث رتبة حساب الموقع؛ وعند الرفض لا تُمنح أي رتبة ويرسل البوت إشعارًا خاصًا للمشتري.
- VIP Role ID: `1572408075514806443` — PREMIUM Role ID: `1572408228464300132`.
- يجب أن يكون `DISCORD_BOT_TOKEN` مضبوطًا، وأن يملك البوت صلاحية Manage Roles، وأن تكون رتبة البوت أعلى من VIP وPREMIUM. يجب أن يكون المشتري عضوًا في السيرفر وأن يكتب Discord User ID الصحيح.
- أزرار الرتب مخصصة لحساب Discord المعرّف في إعداد `discord_owner_id` فقط.
- لم يتم تغيير نظام العملات أو السلة أو المنتجات.

- ملف التسليم لا يحتوي على `.env` حفاظًا على التوكنات؛ عند تحديث مشروعك اترك ملف `.env` الحالي كما هو، أو أعد إدخال القيم السرية يدويًا. أسعار VIP وPREMIUM تبدأ غير مفعّلة حتى يحددها المالك من إعدادات المتجر.
