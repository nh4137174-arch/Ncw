# Nahid Computer — Digital Service Website V2

এটি আগের Dark Navy + Neon Blue/Cyan ডিজাইন ধরে বানানো GitHub Pages-ready Firebase starter project। ZIP extract করলে index.html ও অন্যান্য ফাইল সরাসরি repository root-এ থাকবে। এখানে Public website, Google Login, customer profile, order submission, bKash Transaction ID submission, owner payment confirmation, status update, private file upload/download এবং payment-confirmed order-এর print/save-as-PDF invoice flow আছে।

**গুরুত্বপূর্ণ:** এই ZIP-এ bKash/contact নম্বর 01324392059 বসানো হয়েছে। Firebase Web App config `nahidv30-f15a9` প্রজেক্ট থেকে বসানো হয়েছে। প্রকাশের আগে Firebase Console-এ Authentication, Firestore ও Storage চালু আছে কি না এবং security rules প্রকাশ করা হয়েছে কি না যাচাই করুন। Owner Google email: nh4137174@gmail.com (Admin access UID দিয়ে সেট হবে, শুধু email লিখলেই Admin হবে না)। সেটআপ না করে সাইট publish করলে Login/Order কাজ করবে না। আগে test project-এ সেটআপ ও security rules পরীক্ষা করুন। GitHub Pages static hosting নিজে database, authentication বা private file storage দেয় না—সেজন্য Firebase দরকার।

## 1. ফাইলগুলো
- `index.html` — website UI
- `style.css` — responsive neon digital design + animation
- `app.js` — Firebase login, order, payment submission, admin panel, private file download, invoice
- `firebase-config.js` — আপনার Firebase Web config এবং bKash Merchant নম্বর বসানোর জায়গা
- `firestore.rules` — customer/admin database access rules
- `storage.rules` — private file rules (10 MB/file)

## 2. Firebase project তৈরি
1. `https://console.firebase.google.com/` খুলে Google account দিয়ে login করুন।
2. **Add project** চাপুন; এই ZIP-এ কনফিগার করা Firebase project হলো `nahidv30-f15a9`; Firebase Console-এ একই project খুলে Web App config মিলিয়ে নিন। অন্য project ব্যবহার করতে চাইলে `firebase-config.js`-এর সব config মান একসঙ্গে সেই project-এর মান দিয়ে বদলান।
3. Project তৈরি হলে Project Overview থেকে Web icon `</>` চাপুন, app name দিন `Nahid Computer Website`, Register app করুন।
4. দেখানো `firebaseConfig` values কপি করুন। এগুলো `firebase-config.js`-এর একই নামের field-এ বসান। `YOUR_PROJECT_ID`-এর সব জায়গায় নিজের Project ID দিন। Firebase config client website-এ ব্যবহার করার জন্যই; কখনো service-account private key এখানে দেবেন না।
5. Firebase Console → **Authentication → Get started → Sign-in method → Google → Enable → Save**।
6. Authentication → **Settings → Authorized domains**-এ আপনার GitHub Pages domain যোগ করুন, যেমন `yourusername.github.io` (নিজের আসল GitHub username/domain বসাবেন)।
7. Build → **Firestore Database → Create database**। শুরুতে production mode বেছে নিয়ে Rules tab-এ `firestore.rules`-এর পুরো content paste করে Publish করুন।
8. Build → **Storage → Get started**। Rules tab-এ `storage.rules` paste করে Publish করুন। Storage চালুর জন্য Firebase account-এ billing/plan সংক্রান্ত শর্ত দেখালে Console-এ যা দেখায় তা আগে পড়ে নিন; খরচ হতে পারে।

## 3. bKash Merchant নম্বর বসানো
`firebase-config.js` খুলে এই লাইনটি খুঁজুন:

`export const BKASH_MERCHANT_NUMBER = "ADD_BKASH_MERCHANT_NUMBER_HERE";`

এই প্যাকেজে 01324392059 বসানো আছে—এটি আপনার আসল bKash Merchant নম্বর কি না প্রকাশের আগে নিশ্চিত করুন। এটি **ম্যানুয়াল পেমেন্ট যাচাই**—সাইট bKash-এর সঙ্গে স্বয়ংক্রিয়ভাবে যুক্ত নয়, পেমেন্ট API ব্যবহার করছে না। Customer Transaction ID ও amount জমা দেবে; Admin নিজের bKash merchant transaction history-তে যাচাই করে তবেই Confirm করবে। ভুল Transaction ID দিলে Confirm করবেন না।

## 4. Owner Admin account চালু করা
1. GitHub Pages-এ প্রথমে সাইট publish করুন, তারপর সাইটে নিজের Owner Google account দিয়ে একবার Login করুন।
2. Firebase Console → Authentication → Users-এ গিয়ে নিজের account-এর **User UID** কপি করুন।
3. Firestore Database → Data → Start collection / Add document করুন। Collection ID: `admins`; Document ID হিসেবে ঠিক ওই UID বসান। Field: `active` — Boolean — `true`।
4. Save করুন এবং website-এ Logout/Login বা refresh দিন। এরপর Admin Panel দেখা উচিত।
5. অন্য কাউকে `admins` collection-এ যোগ করবেন না। Admin document website থেকে তৈরি করা যায় না; Console থেকে Owner-ই সেট করবেন।

## 5. GitHub-এ website আপলোড
1. GitHub-এ আপনার `nahid-computer` repository খুলুন।
2. আগের ফাইলগুলোর backup রাখতে চাইলে আগে download/duplicate করে রাখুন।
3. এই ZIP extract করুন। ফাইলগুলো সরাসরি repository root-এ থাকবে; `index.html` যেন root-এ থাকে। সব ফাইল upload করুন: `index.html`, `style.css`, `app.js`, `firebase-config.js`, `firestore.rules`, `storage.rules`, `README-BN.md`।
4. `firebase-config.js`-এ Firebase config ও Merchant নম্বর ঠিক করে commit করুন।
5. Repository → Settings → Pages → Branch `main`, Folder `/(root)` → Save। কিছুক্ষণ পরে GitHub Pages URL refresh করুন।
6. প্রথমে test account দিয়ে Google Login, profile save, test order, payment info, Admin confirmation এবং file upload/download পরীক্ষা করুন। এরপর public-কে ব্যবহার করতে দিন।

## 6. অর্ডার ও পেমেন্টের নিয়ম
- Mobile OTP নেই। Google Login বাধ্যতামূলক; প্রোফাইলে নাম ও মোবাইল নম্বর দিতে হবে।
- প্রতিটি order-এর জন্য `NC-YYYY-XXXXXX` ধাঁচের ID তৈরি হয়।
- Customer কাজের file প্রতি ফাইল সর্বোচ্চ 10 MB আপলোড করতে পারবে।
- Transaction ID + amount জমা দিলে Payment status `pending` হবে। Website নিজে টাকা পাওয়ার প্রমাণ যাচাই করতে পারে না। Owner bKash transaction history মিলিয়ে Admin Panel-এ `Confirm Payment` চাপবেন।
- Customer শুধু `Pending` order cancel করতে পারবে। Admin status `Received`, `Processing`, `Complete`, `Cancelled` করতে পারবে।
- Payment confirm হওয়ার পর customer PDF invoice তৈরি/Print → Save as PDF করতে পারবে। Invoice হলো website-generated receipt; এটি bKash-এর official receipt নয়।
- Final work file private Storage-এ থাকে; customer নিজের order-এর file এবং Owner access করতে পারে। Public download URL তৈরি করা হয় না।


## সাদা পেজ দেখালে কী করবেন
এই সংস্করণে CSS-এর reveal animation এমনভাবে ঠিক করা হয়েছে যেন Firebase/JavaScript লোডে সমস্যা হলেও ওয়েবসাইটের লেখা ও ডিজাইন লুকিয়ে না যায়। GitHub Pages-এ প্রকাশের পরও সাদা পেজ থাকলে repository Settings → Pages-এ `main` branch এবং `/(root)` নির্বাচন করুন, root-এ `index.html` আছে নিশ্চিত করুন, তারপর hard refresh দিন (কম্পিউটারে Ctrl+F5)। ফোনে browser cache পরিষ্কার করে আবার খুলুন। ZIP ফাইলের preview থেকে নয়, GitHub Pages-এর প্রকাশিত URL থেকে পরীক্ষা করুন।

কম্পিউটারে সরাসরি `index.html` ডাবল-ক্লিক করে খোলার বদলে VS Code-এ Live Server দিয়ে চালান; JavaScript ES modules ও Firebase imports `file://` থেকে ব্লক হতে পারে।

## 7. এখনো আলাদা করে সেটআপ/যোগ করা বাকি
- **Email notifications:** এই starter-এর বর্তমান version-এ website dashboard/order status আছে; স্বয়ংক্রিয় email পাঠানো এখনো সক্রিয় নয়। Email চালু করতে নিরাপদ server-side Cloud Function বা Firebase Trigger Email Extension এবং sender verification/configuration করতে হবে। Client-side থেকে সরাসরি email পাঠানো নিরাপদ নয়।
- **Order email receipts / customer notification inbox:** পরের version-এ notification collection ও email trigger যুক্ত করা যাবে।
- **Price list management:** আপাতত public price section-এ “দাম জানতে অর্ডার দিন” লেখা আছে, যাতে ভুল/sample দাম না দেখায়। Admin price editor এখনো সম্পূর্ণ implement করা হয়নি; প্রকৃত মূল্য তালিকা দিলে আলাদা dynamic management যুক্ত করা উচিত।
- **Quotation acceptance:** Quote amount Owner set করে customer accept করবে—এ workflow পরের version-এ যুক্ত করা দরকার।
- **Invoice numbering / tax details:** বর্তমান invoice order number ব্যবহার করে। VAT/tax বা দোকানের নির্দিষ্ট invoice policy থাকলে আলাদা করে ঠিক করতে হবে।

## 8. Security notes
- Firebase Security Rules paste না করে site live করবেন না। Rules ভুল হলে private customer files expose হতে পারে।
- Firebase Web config website-এ থাকতে পারে; Service Account JSON/private keys কখনো GitHub-এ upload করবেন না।
- GitHub repository public হলে config values দেখা যায়; Firebase Security Rules-ই database/storage access control করে।
- প্রথমে নিজের test order দিয়ে পরীক্ষা করুন। Sensitive NID/password/document শুধু প্রয়োজন হলে আপলোড করতে বলুন।
- Firebase Storage/other services-এর current billing and free-tier limits Console-এ যাচাই করুন।


## জরুরি কনফিগারেশন নোট
`firebase-config.js`-এ API key, messaging sender ID এবং app ID ইচ্ছাকৃতভাবে placeholder রাখা হয়েছে, কারণ এগুলো আপনার Firebase Console থেকে সঠিকভাবে নিতে হবে। এই তিনটি মান বসানোর আগে Google Login, order submission বা file upload কাজ করবে না। Project settings → Your apps → Web app-এর `firebaseConfig` object থেকে মান কপি করুন।


## প্রকাশের আগে বাধ্যতামূলক চেকলিস্ট
- [x] `firebase-config.js`-এ Web App config বসানো হয়েছে (`nahidv30-f15a9`)।
- [ ] Firebase Authentication-এ Google sign-in চালু এবং Authorized domains-এ GitHub Pages domain যোগ করা হয়েছে।
- [ ] Firestore ও Storage তৈরি করে rules publish এবং test করা হয়েছে।
- [ ] Firebase Authentication-এ Google provider চালু এবং GitHub Pages domain Authorized domains-এ যোগ করা হয়েছে।
- [ ] Firestore database তৈরি করে `firestore.rules` প্রকাশ করা হয়েছে।
- [ ] Storage চালু করে `storage.rules` প্রকাশ করা হয়েছে; Firebase Console-এ billing/plan শর্ত যাচাই করা হয়েছে।
- [ ] Owner account-এর UID দিয়ে `admins/{UID}` document-এ `active: true` Boolean manually তৈরি করা হয়েছে।
- [ ] নিজের test account দিয়ে login, profile save, order submit, file upload/download ও admin actions পরীক্ষা করা হয়েছে।

**এখনকার অবস্থা:** সাইটের frontend GitHub Pages-এ serve করা যাবে, কিন্তু Firebase config-এর ৩টি placeholder পূরণ না করা পর্যন্ত Login/Database/Storage feature কাজ করবে না। আমি আপনার Firebase Console-এ প্রবেশ করতে পারি না, তাই ওই মানগুলো অনুমান করে বসানো হয়নি।

---

## নতুন Admin Control Panel (এই সংস্করণে)

এই সংস্করণে `admin.html` আলাদা Admin page হিসেবে যোগ করা হয়েছে। মূল ওয়েবসাইটের Login পপ-আপ থেকে **Admin Login** নির্বাচন করলে অনুমোদিত Admin সফলভাবে লগইন করার পর এই পেজে যাবে। সরাসরি `your-site-url/admin.html` খুললেও Admin Login চাইবে। কেবল পেজের URL লুকানো নিরাপত্তা নয়; Firestore Rules-এ `admins/{UID}` এবং `active: true` যাচাই করা হয়।

### প্রথমবার Admin সেটআপ

1. Firebase Console → **Authentication → Sign-in method** খুলুন।
2. **Email/Password** provider Enable করুন। Google login রাখতে চাইলে Google provider-ও Enable রাখুন। Email verification বাধ্যতামূলক করা হয়নি।
3. Authentication → Users থেকে Owner-এর email/password account তৈরি করুন, অথবা সাইটের Customer Login → “নতুন অ্যাকাউন্ট তৈরি করুন” দিয়ে ওই email-এ account বানান। পাসওয়ার্ড শুধু Firebase Authentication-এ সেট করুন; Firestore-এ পাসওয়ার্ড লিখবেন না।
4. Authentication → Users থেকে Owner account-এর **UID** কপি করুন।
5. Firestore Database → Data → Start collection: `admins`; Document ID হিসেবে ওই UID দিন। Field যোগ করুন: `active` (Boolean) = `true`। `admins` document শুধু Console থেকে Owner তৈরি করবে; website থেকে admin access দেওয়া যায় না।
6. এই ZIP-এর `firestore.rules` এবং `storage.rules` Firebase Console-এর Rules tab-এ প্রকাশ করুন।
7. GitHub Pages-এ `index.html`, `admin.html`, `app.js`, `style.css`, `firebase-config.js`, `firestore.rules`, `storage.rules`, `README-BN.md`, `.nojekyll` repository root-এ রাখুন।

### Admin Panel-এ কীভাবে কাজ করবেন

- `admin.html` খুলে Admin Login করুন।
- **সার্ভিস ও মূল্য ম্যানেজমেন্ট:** সার্ভিসের নাম, বিবরণ, দাম, একক, ক্যাটাগরি এবং ওয়েবসাইটে দেখানো হবে কি না ঠিক করে Save করুন। দাম খালি রাখলে “দাম জানতে যোগাযোগ করুন”/কোটেশন দেখাবে।
- **প্রাথমিক সার্ভিস যোগ:** শুরুতে আটটি সাধারণ সার্ভিস Firestore-এ যোগ করবে। এগুলোর দাম আগে থেকে অনুমান করে বসানো হয়নি; নিজের দোকানের সঠিক দাম বসান।
- **দোকানের সেটিংস:** দোকানের নাম, bKash নম্বর, WhatsApp, ফোন, ঠিকানা ও নিয়মাবলি পরিবর্তন করে Save করুন। bKash নম্বর ডিফল্টভাবে ফাঁকা—পেমেন্ট নেওয়ার আগে নিজের সঠিক bKash নম্বর দিন। WhatsApp নম্বরের আন্তর্জাতিক country code website স্বয়ংক্রিয়ভাবে যোগ করে।
- **অর্ডার ও পেমেন্ট:** অর্ডারের স্ট্যাটাস পরিবর্তন, Transaction ID যাচাই করে payment confirm এবং কাজের ফাইল আপলোড করুন। শুধু Transaction ID লেখা থাকলেই টাকা Confirm করবেন না; bKash transaction মিলিয়ে নিন।
- **সার্ভিস পরিবর্তন:** ওয়েবসাইটের public service cards, order dropdown এবং price list Firestore-এর `services` collection থেকে আপডেট হবে। সেটিংস `siteSettings/main` document-এ সংরক্ষিত হবে।

### Firebase data rules

- `services`: সবাই পড়তে পারবে, কেবল Admin create/update/delete করতে পারবে।
- `siteSettings`: public site contact/pricing guidance পড়তে পারবে, কেবল Admin পরিবর্তন করতে পারবে।
- `admins`: ওয়েবসাইট থেকে create/update করা যায় না। Owner-এর UID এবং `active: true` অবশ্যই Firebase Console-এ তৈরি করতে হবে।
- `orders` ও Storage files: কাস্টমার নিজের অর্ডার/ফাইল এবং Admin অনুমোদিত কাজগুলো দেখতে পারবে।

**গুরুত্বপূর্ণ সীমাবদ্ধতা:** ZIP-এর code syntax এবং HTML/JS ID references পরীক্ষা করা হয়েছে, কিন্তু এই চ্যাট থেকে live Firebase authentication, database rules, payment verification বা GitHub Pages deployment চালিয়ে পরীক্ষা করা সম্ভব নয়। প্রকাশের পর test account দিয়ে registration, admin login, service price save, order submit, file upload এবং payment confirmation যাচাই করুন। Firebase Console-এ Rules publish না করলে Admin Panel-এর Save কাজ করবে না।


## সমস্যা সমাধান: অর্ডার ও Admin Panel

- Admin Panel থেকে নতুন সার্ভিস যোগ/দাম বদলানো/মুছতে পারবেন; প্রতিবার Firebase Console-এ গিয়ে সার্ভিস যোগ করার প্রয়োজন নেই। তবে প্রথমবার Firebase Authentication, `admins/{UID}` এবং ZIP-এর `firestore.rules` ও `storage.rules` একবার সঠিকভাবে সেটআপ ও Publish করতে হবে।
- Firestore Rules-এ `allow read, write: if true;` ব্যবহার করবেন না। ZIP-এর `firestore.rules` এবং `storage.rules` Firebase Console-এর সংশ্লিষ্ট Rules ট্যাবে প্রকাশ করুন।
- Admin Document: Collection `admins`, Document ID = Authentication-এর Admin UID, Boolean field `active` = `true`।
- অর্ডার জমা দেওয়ার আগে Login করতে হবে এবং Profile-এ নাম ও ফোন নম্বর Save থাকতে হবে।
- ফাইল আপলোডে সমস্যা হলেও অর্ডার তৈরি হয়ে গেলে ওয়েবসাইট এখন Order ID দেখাবে এবং ফাইল আপলোডের সমস্যা আলাদা করে জানাবে।
- এই ZIP-এর কোড static/syntax check করা হয়েছে; লাইভ Firebase প্রজেক্টে Publish করে বাস্তব অর্ডার পরীক্ষা করা প্রয়োজন।


## নতুন UI ও ফাইল ডেলিভারি আপডেট

- প্রথমে Welcome Board / Login / Sign Up স্ক্রিন দেখাবে; লগইন না করা পর্যন্ত সাইটের মূল অংশ লুকানো থাকবে।
- লগইনের পরে Login/Sign Up বাটন লুকিয়ে ডান পাশে Profile ও Logout থাকবে।
- Login ও confirmation popup স্ক্রিনের ডান-উপর দিকে বড় আকারে দেখাবে।
- আধুনিক ডিজিটাল সাউন্ড ব্রাউজারের অনুমতি অনুযায়ী বাজবে; Login popup-এর Sound ON/OFF বাটন দিয়ে বন্ধ/চালু করা যাবে।
- Admin Panel-এর অর্ডার টেবিলে কাস্টমারের আপলোড করা ডকুমেন্টের আলাদা Open/Download বাটন থাকবে। Admin-এর আপলোড করা Work File কাস্টমারের নিজের Dashboard-এ দেখা যাবে।
- কাস্টমারের ফাইলের metadata সংরক্ষণ করার জন্য `firestore.rules`-এ সীমিত owner-update অনুমতি যোগ করা হয়েছে।

### গুরুত্বপূর্ণ: Firebase Rules আবার Publish করতে হবে

এই ZIP আপলোড করার পরে Firebase Console-এ গিয়ে **Firestore Database → Rules**-এ এই ZIP-এর `firestore.rules` এবং **Storage → Rules**-এ `storage.rules` প্রকাশ করুন। আগে থেকে থাকা নিয়মের ব্যাকআপ রাখুন। `allow read, write: if true;` ব্যবহার করবেন না। Admin-এর জন্য `admins/{UID}` ডকুমেন্টে `active: true` (Boolean) থাকতে হবে।

### ফাইল পরীক্ষা

- অর্ডারের ডকুমেন্ট: Customer অর্ডারের সঙ্গে ফাইল দিলে Admin Panel-এর Customer files অংশে নামসহ বাটন দেখা যাবে।
- Work File: Admin অর্ডার সারিতে ফাইল বেছে `Upload work file` চাপলে কাস্টমারের নিজের অর্ডার কার্ডে ফাইল বাটন দেখা যাবে।
- ফাইল দেখা/ডাউনলোড না হলে প্রথমে Firestore এবং Storage Rules প্রকাশ হয়েছে কি না, Admin UID সঠিক কি না এবং অর্ডারে ফাইলের metadata আছে কি না যাচাই করুন।
- কোড/ZIP স্থানীয়ভাবে পরীক্ষা করা হয়েছে; লাইভ Firebase প্রকল্পে বাস্তব অর্ডার, ফাইল ও লগইন পরীক্ষা এখনও করতে হবে।
