Nahid Computer V2 — Customer/Work Files Fix (2026-10-21)

Included fixes:
1. Admin orders query retries without orderBy if legacy documents/orderBy query fails, so older orders are less likely to disappear.
2. Legacy file metadata keys customerFiles/uploadedFiles and workFiles/adminFiles are normalized for display.
3. Storage recovery checks orderFiles/{customerUid}/{orderId} and finalFiles/{customerUid}/{orderId} for missing Firestore file metadata.
4. File download errors now show the Firebase error code/message to make Storage Rules/path problems diagnosable.
5. Firebase config kept for project nahidv30-f15a9 (the project used by the latest package).

IMPORTANT:
- Publish firestore.rules and storage.rules from this ZIP in the SAME Firebase project configured in firebase-config.js.
- Firebase Console > Authentication must have the intended sign-in provider enabled.
- Admin account must have admins/{AUTH_UID} document with active: true. This record is created manually in Firestore; the website cannot grant admin access.
- Customer uploads and Admin work files are linked to an order document. Existing Storage files can only be recovered automatically if they are inside orderFiles/{uid}/{orderId}/ or finalFiles/{uid}/{orderId}/ and the deployed rules permit access.
- After uploading to GitHub, hard-refresh the site and test with one customer account and one admin account. Live Firebase behavior cannot be certified from a static ZIP alone.
- Never publish service-account private keys or passwords. The web app config is public client config.
