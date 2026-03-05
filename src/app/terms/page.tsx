import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "תקנון | בופלו כהנוב",
  description: "תקנון האתר ותנאי השימוש - בופלו כהנוב, בוטיק בשרים פרימיום",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold text-[var(--color-gold)]">
        תקנון האתר
      </h1>

      <div className="space-y-8 text-sm leading-relaxed text-white/80">
        <section>
          <h2 className="mb-3 text-lg font-semibold text-white">1. כללי</h2>
          <p>
            ברוכים הבאים לאתר בופלו כהנוב (להלן: &quot;האתר&quot;). האתר מופעל
            על ידי בופלו כהנוב (להלן: &quot;העסק&quot;). השימוש באתר מהווה הסכמה
            לתנאים המפורטים בתקנון זה. אנא קראו את התקנון בעיון לפני השימוש
            באתר.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-white">
            2. הזמנות ואישור הזמנה
          </h2>
          <p className="mb-2 font-semibold text-[var(--color-gold)]">
            שימו לב: שליחת הזמנה דרך האתר אינה מהווה אישור סופי של ההזמנה.
            ההזמנה תיחשב כמאושרת רק לאחר קבלת אישור מפורש מצוות בופלו כהנוב
            בטלפון או בוואטסאפ.
          </p>
          <p>
            העסק שומר לעצמו את הזכות לאשר, לדחות או לשנות הזמנות בהתאם לזמינות
            המוצרים ושיקולים נוספים. במקרה של אי-זמינות מוצר, ניצור עמכם קשר
            להציע חלופה מתאימה.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-white">3. תשלום</h2>
          <p className="mb-2 font-semibold text-[var(--color-gold)]">
            התשלום עבור ההזמנה מתבצע בטלפון או בוואטסאפ בלבד, ולא דרך האתר.
          </p>
          <p>
            לאחר אישור ההזמנה, צוות בופלו כהנוב ייצור עמכם קשר לתיאום התשלום.
            אנו מקבלים תשלום במזומן, העברה בנקאית או באמצעות אפליקציות תשלום
            מקובלות, בהתאם לתיאום מראש.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-white">4. מחירים</h2>
          <p>
            המחירים המוצגים באתר הם בשקלים חדשים וכוללים מע&quot;מ. המחירים
            עשויים להשתנות מעת לעת ללא הודעה מוקדמת. המחיר הקובע הוא המחיר
            בעת אישור ההזמנה על ידי העסק.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-white">
            5. משלוחים ואיסוף
          </h2>
          <p>
            מועדי האספקה ייקבעו בתיאום ישיר עם הלקוח בטלפון או בוואטסאפ. העסק
            יעשה מאמץ לעמוד בזמני האספקה המוסכמים, אך ייתכנו עיכובים בשל
            נסיבות שאינן בשליטתנו. ניתן גם לאסוף את ההזמנה ישירות ממשק כהנוב
            בתיאום מראש.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-white">
            6. ביטולים והחזרות
          </h2>
          <p>
            ניתן לבטל הזמנה לפני שהעסק אישר אותה ללא חיוב. לאחר אישור ההזמנה,
            ביטול כפוף לתנאי חוק הגנת הצרכן. בשל אופי המוצרים (מוצרי מזון
            טריים), לא ניתן להחזיר מוצרים לאחר קבלתם, אלא במקרה של פגם או
            אי-התאמה מהותית.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-white">
            7. אחריות ושמירה על המוצרים
          </h2>
          <p>
            המוצרים שלנו הם מוצרי מזון טריים ויש לשמור אותם בקירור מיד עם
            קבלתם. העסק אינו אחראי לנזק שנגרם כתוצאה מאחסון לא תקין של
            המוצרים לאחר מסירתם ללקוח.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-white">
            8. פרטיות ומידע אישי
          </h2>
          <p>
            פרטי הלקוחות נשמרים בסודיות ומשמשים לצורך ביצוע ההזמנות בלבד. איננו
            מעבירים מידע אישי לצדדים שלישיים. המידע שנאסף כולל שם, טלפון וכתובת
            למשלוח בלבד.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-white">9. יצירת קשר</h2>
          <p>
            לכל שאלה או בירור ניתן לפנות אלינו בטלפון{" "}
            <a
              href="tel:0524045744"
              className="text-[var(--color-gold)] underline hover:text-white transition-colors"
            >
              052-4045744
            </a>{" "}
            או בוואטסאפ באותו מספר.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-white">
            10. שינויים בתקנון
          </h2>
          <p>
            העסק רשאי לעדכן תקנון זה מעת לעת. התקנון המחייב הוא הנוסח המפורסם
            באתר בעת ביצוע ההזמנה.
          </p>
        </section>
      </div>
    </div>
  );
}
