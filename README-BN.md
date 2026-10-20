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


## 9. Nahid Computer AI Chat Bot (Firebase থেকে আলাদা)
- `chatbot.js` এবং `index.html`/`style.css`-এ AI Chat widget যোগ করা হয়েছে। এটি ওয়েবসাইটের বিদ্যমান Firebase order/login কোড পরিবর্তন করে না; chatbot নিজে Firebase ব্যবহার করে না।
- Gemini API key বসাতে `chatbot.js`-এর শুরুতে `GEMINI_API_KEY`-এর `PASTE_YOUR_GEMINI_API_KEY_HERE` বদলান। বর্তমান কোডে `gemini-2.5-flash` model ব্যবহার করা হয়েছে।
- API key সরাসরি browser code-এ থাকলে সবাই সেটি দেখতে পারে। Google AI Studio-তে key/project-এর quota সীমা দিন, usage নিয়মিত দেখুন এবং এই key-তে billing যুক্ত করবেন না যদি খরচ চান না। Gemini API free-tier limits মডেল ও project অনুযায়ী বদলায়; আপনার সক্রিয় সীমা AI Studio-তে যাচাই করুন। অফিসিয়াল তথ্য: https://ai.google.dev/gemini-api/docs/rate-limits এবং https://ai.google.dev/gemini-api/docs/pricing
- Chat-এ ⚙ চাপলে জ্ঞানভান্ডার সম্পাদনা করা যায়। তবে GitHub Pages-এর static website-এ localStorage-এ সেভ করা পরিবর্তন শুধু সেই browser/device-এ থাকে—সব কাস্টমারের জন্য Admin-এর পরিবর্তন প্রকাশ করার shared backend এখানে নেই। সকলের জন্য স্থায়ী পরিবর্তন করতে `DEFAULT_KNOWLEDGE`-এর তথ্য `chatbot.js`-এ আপডেট করে ZIP/repository পুনরায় publish করুন।
- API key বসানোর আগে bot স্থানীয় fallback দিয়ে সার্ভিস/দাম/ঠিকানা/যোগাযোগের কিছু সাধারণ প্রশ্নের উত্তর দেবে; পূর্ণ AI উত্তর পেতে বৈধ API key প্রয়োজন।
