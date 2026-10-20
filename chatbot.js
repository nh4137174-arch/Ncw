/*
 * Nahid Computer AI Chat — independent of Firebase.
 * For this direct-browser setup, replace GEMINI_API_KEY below with your own key.
 * WARNING: Anyone visiting the public site can inspect this key. Use a restricted key and quota.
 */
const GEMINI_API_KEY = "PASTE_YOUR_GEMINI_API_KEY_HERE";
const GEMINI_MODEL = "gemini-2.5-flash";
const KNOWLEDGE_STORAGE_KEY = "nahidComputerAiKnowledgeV1";

const DEFAULT_KNOWLEDGE = `ব্যবসার নাম: Nahid Computer
ধরন: স্বাধীন ডিজিটাল সার্ভিস প্রতিষ্ঠান; সরকারি দপ্তর নয়।
ঠিকানা: কোর্ট পাড়া, ২৯ নং দোকান, ফরিদপুর সদর, ফরিদপুর, বাংলাদেশ।
ফোন/WhatsApp: 01324392059
WhatsApp লিংক: https://wa.me/8801324392059

সার্ভিস:
- প্রিন্ট, স্ক্যান ও ফটোকপি
- পাসপোর্ট সাইজ ছবি
- অনলাইন আবেদন ও ফর্ম পূরণ
- জমির পর্চা, খাজনা ও মিউটেশন সংক্রান্ত সহায়তা
- TIN ও আয়কর রিটার্ন সংক্রান্ত সহায়তা
- ডকুমেন্ট টাইপিং ও ডিজাইন
- জন্মনিবন্ধন ও NID সংক্রান্ত সাধারণ সহায়তা
- অন্যান্য ডিজিটাল সার্ভিস

দাম:
- নির্দিষ্ট দাম এখনো এই জ্ঞানভান্ডারে দেওয়া নেই। দাম জানতে অর্ডার করতে বা দোকানে WhatsApp/ফোন করতে বলবে।
- কাজের ধরন, পৃষ্ঠা, কাগজ ও জটিলতার ওপর দাম নির্ভর করতে পারে।
- কোনো দাম, সরকারি ফি, সময়সীমা বা নিশ্চয়তা বানিয়ে বলবে না।
- সরকারি ফি ও অনুমোদন সংশ্লিষ্ট সরকারি কর্তৃপক্ষ নির্ধারণ করে।
- কাস্টমার চাইলে ওয়েবসাইটের অর্ডার সেকশন ব্যবহার করতে পারে।

উত্তর দেওয়ার নিয়ম:
- বাংলায় সহজ, ভদ্র ও সংক্ষিপ্তভাবে উত্তর দেবে; ব্যবহারকারী ইংরেজিতে লিখলে ইংরেজিতেও উত্তর দিতে পারো।
- ব্যবসার তথ্যের ক্ষেত্রে এই জ্ঞানভান্ডারকে সত্যের উৎস হিসেবে ধরবে।
- কোনো তথ্য এখানে না থাকলে নিশ্চিত করে বানিয়ে না বলে দোকানে যোগাযোগ করতে বলবে।
- কখনো গ্রাহকের পাসওয়ার্ড, OTP, সম্পূর্ণ কার্ড তথ্য বা অপ্রয়োজনীয় সংবেদনশীল নথি চাইবে না।
- নিজেকে Nahid Computer-এর AI সহায়ক হিসেবে পরিচয় দেবে, মানুষ বা সরকারি প্রতিনিধি হিসেবে নয়।`;

const $ = (id) => document.getElementById(id);
const launcher = $("ncAiLauncher");
const panel = $("ncAiPanel");
const messages = $("ncAiMessages");
const form = $("ncAiForm");
const input = $("ncAiInput");
const send = $("ncAiSend");
const editor = $("ncAiKnowledgeEditor");
const knowledgeText = $("ncAiKnowledgeText");
let history = [];
let busy = false;

function getKnowledge() {
  try { return localStorage.getItem(KNOWLEDGE_STORAGE_KEY) || DEFAULT_KNOWLEDGE; }
  catch { return DEFAULT_KNOWLEDGE; }
}
function addMessage(text, who="bot") {
  const el = document.createElement("div");
  el.className = `nc-ai-msg ${who === "user" ? "nc-ai-user" : "nc-ai-bot"}`;
  el.textContent = text;
  messages.appendChild(el);
  messages.scrollTop = messages.scrollHeight;
  return el;
}
function setOpen(open) {
  panel.hidden = !open;
  launcher.setAttribute("aria-expanded", String(open));
  if (open) setTimeout(() => input.focus(), 80);
}
function typingBubble() {
  const el = document.createElement("div");
  el.className = "nc-ai-msg nc-ai-bot";
  el.innerHTML = '<span class="nc-ai-typing" aria-label="উত্তর তৈরি হচ্ছে"><i></i><i></i><i></i></span>';
  messages.appendChild(el);
  messages.scrollTop = messages.scrollHeight;
  return el;
}
function localFallback(question) {
  const q = question.toLowerCase();
  if (/ঠিকানা|কোথায়|লোকেশন|address|location/.test(q)) return "আমাদের ঠিকানা: কোর্ট পাড়া, ২৯ নং দোকান, ফরিদপুর সদর, ফরিদপুর।";
  if (/ফোন|মোবাইল|যোগাযোগ|হোয়াটসঅ্যাপ|হোয়াটসঅ্যাপ|whatsapp|contact|number/.test(q)) return "যোগাযোগ: 01324392059। WhatsApp: https://wa.me/8801324392059";
  if (/দাম|মূল্য|কত টাকা|price|cost|চার্জ/.test(q)) return "সার্ভিসের নির্দিষ্ট দাম জানতে আপনার কাজের বিবরণসহ অর্ডার দিন অথবা 01324392059 নম্বরে WhatsApp করুন। নিশ্চিত নয় এমন দাম আমি অনুমান করে বলব না।";
  if (/সার্ভিস|কী কী কাজ|কি কি কাজ|কাজ করেন|services/.test(q)) return "আমাদের সার্ভিস: প্রিন্ট/স্ক্যান/ফটোকপি, পাসপোর্ট সাইজ ছবি, অনলাইন আবেদন, জমির পর্চা/খাজনা/মিউটেশন সহায়তা, TIN/রিটার্ন, ডকুমেন্ট টাইপিং/ডিজাইন এবং জন্মনিবন্ধন/NID সংক্রান্ত সাধারণ সহায়তা।";
  return "AI API key এখনো সেট করা হয়নি। আপাতত সার্ভিস, দাম, ঠিকানা বা যোগাযোগ সম্পর্কে জিজ্ঞেস করতে পারেন।";
}
async function askAI(question) {
  if (!GEMINI_API_KEY || GEMINI_API_KEY === "PASTE_YOUR_GEMINI_API_KEY_HERE") return localFallback(question);
  const knowledge = getKnowledge();
  const contents = [
    ...history.slice(-8),
    { role: "user", parts: [{ text: `ব্যবসার জ্ঞানভান্ডার (বিশ্বস্ত তথ্য):\n${knowledge}\n\nগ্রাহকের প্রশ্ন: ${question}\n\nউত্তর বাংলায় সহজ ও সংক্ষিপ্তভাবে দাও। জ্ঞানভান্ডারে নেই এমন ব্যবসায়িক তথ্য, দাম বা সরকারি ফি বানিয়ে বলবে না।` }] }
  ];
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${encodeURIComponent(GEMINI_API_KEY)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents,
      generationConfig: { temperature: 0.35, maxOutputTokens: 450 },
      safetySettings: [
        { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
        { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
        { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
        { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" }
      ]
    })
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    if (response.status === 429) throw new Error("ফ্রি API-এর বর্তমান ব্যবহারসীমা শেষ বা ব্যস্ত আছে। কিছুক্ষণ পরে আবার চেষ্টা করুন।");
    if (response.status === 400 || response.status === 403) throw new Error("API Key বা API সেটিংস ঠিক নেই। chatbot.js ফাইলে Key যাচাই করুন।");
    throw new Error(data?.error?.message || "AI সেবায় সাময়িক সমস্যা হয়েছে।");
  }
  const answer = data?.candidates?.[0]?.content?.parts?.map(p => p.text || "").join("").trim();
  if (!answer) throw new Error("এই প্রশ্নের উত্তর তৈরি করা যায়নি। অন্যভাবে লিখে চেষ্টা করুন।");
  history.push({ role: "user", parts: [{ text: question }] }, { role: "model", parts: [{ text: answer }] });
  history = history.slice(-12);
  return answer;
}
async function submitQuestion(question) {
  const q = String(question || "").trim();
  if (!q || busy) return;
  addMessage(q, "user");
  input.value = "";
  busy = true; send.disabled = true;
  const typing = typingBubble();
  try {
    const answer = await askAI(q);
    typing.remove();
    addMessage(answer);
  } catch (error) {
    typing.remove();
    addMessage(error?.message || "দুঃখিত, এখন উত্তর দেওয়া যাচ্ছে না।");
  } finally {
    busy = false; send.disabled = false; input.focus();
  }
}
launcher.addEventListener("click", () => setOpen(panel.hidden));
$("ncAiClose").addEventListener("click", () => setOpen(false));
form.addEventListener("submit", e => { e.preventDefault(); submitQuestion(input.value); });
document.querySelectorAll("[data-ncai]").forEach(btn => btn.addEventListener("click", () => submitQuestion(btn.dataset.ncai)));
$("ncAiKnowledgeBtn").addEventListener("click", () => {
  editor.hidden = !editor.hidden;
  if (!editor.hidden) knowledgeText.value = getKnowledge();
});
$("ncAiKnowledgeSave").addEventListener("click", () => {
  try {
    localStorage.setItem(KNOWLEDGE_STORAGE_KEY, knowledgeText.value.trim() || DEFAULT_KNOWLEDGE);
    addMessage("জ্ঞানভান্ডার এই ব্রাউজারে সেভ হয়েছে। মনে রাখবেন, GitHub Pages-এর static সাইটে এটি অন্য কাস্টমারের ব্রাউজারে নিজে থেকে আপডেট হবে না।");
    editor.hidden = true;
  } catch { addMessage("এই ব্রাউজারে সেভ করা যায়নি।"); }
});
$("ncAiKnowledgeReset").addEventListener("click", () => { knowledgeText.value = DEFAULT_KNOWLEDGE; });
