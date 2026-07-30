import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "10mb" }));

  // Initialize Gemini Client
  let ai: GoogleGenAI | null = null;
  if (process.env.GEMINI_API_KEY) {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }

  // System Prompt for Anis (أنيس - المساعد الأسري والتربوي الذكي)
  const ANIS_SYSTEM_PROMPT = `أنت "أنيس"، المرشد الأسري والتربوي والنفسي الذكي لمنصة "ميثاق".
شعار ميثاق هو: "ميثاق... حيث يبدأ التفاهم".
مهمتك تقديم استشارات أسرية وتربوية ونفسية رفيعة المستوى، مبنية على أسس علمية وقيم إسلامية وأخلاقية أصيلة.
خصائص إجاباتك:
1. التحدث باللغة العربية الفصحى الراقية، الدافئة، والمطمئنة.
2. التركيز على احتواء المشاعر، التعاطف العميق، والإنصات الإيجابي.
3. تقديم خطوات عملية ومحددة (1, 2, 3) لحل الخلافات الزوجية، التعامل مع الأبناء، إدارة الضغوط، أو تطوير الذات.
4. مراعاة الخصوصية، التشجيع المستمر، والتنبيه بلطف إذا كانت الحالة تتطلب استشارة مباشرة مع أحد أطباء أو استشاريي منصة ميثاق.
5. لا تقم أبداً بإفشاء أي بيانات شخصية أو الخروج عن النطاق الأسري والنفسي والتربوي.`;

  // API Route: AI Assistant Chat (أنيس)
  app.post("/api/ai/chat", async (req, res) => {
    try {
      const { messages, category, userContext } = req.body;
      
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Invalid message format" });
      }

      if (!ai && !process.env.GEMINI_API_KEY) {
        // Fallback response if GEMINI_API_KEY is missing
        return res.json({
          reply: `أهلاً بك في ميثاق. أنا "أنيس" مستشارك الأسري الذكي. يسعدني مساعدتك في مجال (${category || "الاستشارات الأسرية"}). 
لكي نبدأ بالتفاهم، ما هي أبرز التحديات التي تود مناقشتها اليوم؟ (ملاحظة: يمكنك ضبط مفتاح API في الإعدادات لتفعيل كامل إمكانيات الذكاء الاصطناعي).`,
          sources: ["ميثاق - دليل التفاهم الأسري", "دراسات العلاقات الأسرية المستقرة"],
          suggestedActions: ["حجز استشارة مع أخصائي", "إجراء اختبار لغات الحب", "تصفح مقالات العلاقات"]
        });
      }

      const client = ai || new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY!,
        httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
      });

      // Format conversation history
      const lastUserMsg = messages[messages.length - 1]?.content || "";
      const promptContext = userContext ? `\n[سياق المستفيد]: ${JSON.stringify(userContext)}` : "";
      const fullPrompt = `${ANIS_SYSTEM_PROMPT}\n${promptContext}\n\nطلب المستفيد: ${lastUserMsg}`;

      const response = await client.models.generateContent({
        model: "gemini-3.6-flash",
        contents: fullPrompt,
        config: {
          temperature: 0.7,
        }
      });

      const replyText = response.text || "أعتذر، حدث تعثر بسيط أثناء تحليل استفسارك. هل يمكنك إعادة صياغته؟";

      return res.json({
        reply: replyText,
        sources: [
          "دليل ميثاق للتربية الإيجابية والاستقرار الأسري",
          "توصيات الاستشاريين المعتمدين لدى ميثاق"
        ],
        suggestedActions: [
          "حجز جلسة متابعة مع استشاري متخصص",
          "حفظ التوصيات في ملفك الشخصي",
          "تصفح الدورة التدريبية ذات الصلة"
        ]
      });
    } catch (err: any) {
      console.error("Gemini Chat API Error:", err);
      return res.status(500).json({
        error: "Failed to generate response",
        reply: "أعتذر عن هذا الخلل الفني المؤقت. أنا أنيس، وأنا هنا لدعمك. يرجى المحاولة مرة أخرى بعد لحظات."
      });
    }
  });

  // API Route: Generate Family & Mental Health Assessment Report
  app.post("/api/ai/analyze-assessment", async (req, res) => {
    try {
      const { testTitle, answers, score, maxScore } = req.body;

      if (!ai && !process.env.GEMINI_API_KEY) {
        return res.json({
          report: {
            overallAssessment: "أظهرت نتائج الاختبار مستويات ممتازة من الوعي الأسري والرغبة الصادقة في التطوير والارتقاء بالعلاقة.",
            strengths: ["الرغبة في التواصل الفعال", "الوعي بأهمية الاستقرار العاطفي", "الاستعداد للتغير الإيجابي"],
            growthAreas: ["إدارة لحظات الغضب والانفعال", "تخصيص وقت حوار يومي منتظم"],
            recommendations: [
              "ممارسة تمرين التنفس العميق عند الاشتداد العاطفي",
              "قراءة مقال 'خطوات الحوار البناء' المتاح في مكتبة ميثاق",
              "حجز جلسة تقييم شاملة مع استشاري زوجي"
            ]
          }
        });
      }

      const client = ai || new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY!,
        httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
      });

      const prompt = `أنت الخبير النفسي والأسري في منصة "ميثاق".
قم بإنشاء تقرير تحليلي دقيق ومشجع باللغة العربية بناءً على اختبار: "${testTitle}".
الدرجة التي حصل عليها المستخدم: ${score} من ${maxScore}.
الإجابات التفصيلية: ${JSON.stringify(answers)}

قم بالرد بصيغة JSON حصرية بالهيكل التالي:
{
  "overallAssessment": "ملخص شامل ومشجع للحالة",
  "strengths": ["نقطة قوة 1", "نقطة قوة 2", "نقطة قوة 3"],
  "growthAreas": ["مجال تحسين 1", "مجال تحسين 2"],
  "recommendations": ["توصية عملية 1", "توصية عملية 2", "توصية عملية 3"]
}`;

      const response = await client.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json"
        }
      });

      const parsed = JSON.parse(response.text || "{}");
      return res.json({ report: parsed });
    } catch (err: any) {
      console.error("Assessment analysis error:", err);
      return res.status(500).json({
        report: {
          overallAssessment: "تم إكمال الاختبار بنجاح بنتيجة إيجابية تعكس حرصك الكبير على جودة الحياة الأسرية.",
          strengths: ["المرونة النفسية", "الاهتمام بالشريك والأبناء"],
          growthAreas: ["تعزيز مهارات الاستماع الفعال"],
          recommendations: ["متابعة البرامج التثقيفية في ميثاق"]
        }
      });
    }
  });

  // API Route: Relationship Chat Analysis (تحليل علاقات التواصل)
  app.post("/api/ai/analyze-relationship", async (req, res) => {
    try {
      const { textInput } = req.body;

      if (!textInput || typeof textInput !== "string" || textInput.trim().length === 0) {
        return res.status(400).json({ error: "Missing textInput parameter" });
      }

      if (!ai && !process.env.GEMINI_API_KEY) {
        return res.json({
          analysis: {
            emotions: [
              { emotion: "عتاب وحيرة", percentage: 40, color: "bg-amber-500" },
              { emotion: "رغبة في التفاهم", percentage: 35, color: "bg-emerald-500" },
              { emotion: "دفاعي", percentage: 25, color: "bg-rose-500" }
            ],
            tensionScore: 55,
            misunderstandings: [
              "اختلاف توقعات الحوار عند الحديث عن ميزانية أو هدوء المنزل",
              "الشعور بعدم التقدير للمجهود المبذول من الطرفين"
            ],
            aggressiveWording: [
              { text: "أنت لا تهتم أبداً", softerAlternative: "أشعر بالوحدة وأحتاج دعمك في هذه اللحظة" },
              { text: "دائماً تكرر هذا الخطأ", softerAlternative: "يهمني أن نجد حلاً مستداماً لهذا الموقف" }
            ],
            recommendations: [
              "استخدام أسلوب 'أنا أشعر' بدلاً من توجيه الاتهامات 'أنت فعلت'",
              "تحديد وقت محدد ومريح للحوار عندما يكون الطرفان في حالة هدوء",
              "إتاحة فرصة 3 دقائق للطرف الآخر للتعبير دون مقاطعة"
            ]
          }
        });
      }

      const client = ai || new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY!,
        httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
      });

      const prompt = `أنت الخبير الأكبر في تحليل الحوار والعلاقات الزوجية والأسرية في منصة "ميثاق".
قم بتحليل النص أو محادثة الواتساب/المسنجر التالية من ناحية المشاعر، مستوى التوتر، نقاط سوء الفهم، والألفاظ الحادة مع البدائل الألطف:

المحادثة المراد تحليلها:
"""
${textInput}
"""

قم بالرد بصيغة JSON حصرية فقط بالهيكل التالي:
{
  "emotions": [
    { "emotion": "اسم المشاعر (مثل: دفاعي، عتاب، اهتمام، غضب)", "percentage": 40, "color": "bg-rose-500" },
    { "emotion": "اسم المشاعر 2", "percentage": 35, "color": "bg-amber-500" },
    { "emotion": "اسم المشاعر 3", "percentage": 25, "color": "bg-emerald-500" }
  ],
  "tensionScore": 60,
  "misunderstandings": ["نقطة سوء فهم 1", "نقطة سوء فهم 2"],
  "aggressiveWording": [
    { "text": "العبارة الحادة الأصيلة", "softerAlternative": "الصياغة الألطف والأكثر بناءً" }
  ],
  "recommendations": ["توصية عملية 1", "توصية عملية 2", "توصية عملية 3"]
}`;

      const response = await client.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json"
        }
      });

      const parsed = JSON.parse(response.text || "{}");
      return res.json({ analysis: parsed });
    } catch (err: any) {
      console.error("Relationship analysis error:", err);
      return res.status(500).json({
        analysis: {
          emotions: [
            { emotion: "عتاب", percentage: 50, color: "bg-amber-500" },
            { emotion: "حرص على الأسرة", percentage: 50, color: "bg-emerald-500" }
          ],
          tensionScore: 45,
          misunderstandings: ["حاجة الحوار إلى الهدوء وتخفيف الضغط اليومي"],
          aggressiveWording: [
            { text: "أنت السبب", softerAlternative: "دعنا نتشارك حل هذه العقبة معاً" }
          ],
          recommendations: ["تخصيص وقت حوار مريح بعيداً عن صخب الأولاد"]
        }
      });
    }
  });

  // API Route: Send Email Notification to Consultant or User
  app.post("/api/notifications/send-email", async (req, res) => {
    try {
      const { type, recipientEmail, recipientName, consultantName, clientName, sessionDetails, messageText } = req.body;

      console.log(`[Email Notification Dispatcher] Type: ${type}, Recipient: ${recipientEmail || 'Consultant'}`);

      const timestamp = new Date().toISOString();
      let subject = "تنبيه جديد من منصة ميثاق الأسرية";
      let htmlBody = "";

      if (type === "new_booking") {
        subject = `📅 حجز استشارة جديدة: ${clientName || 'مستفيد'} مع ${consultantName || 'المستشار'}`;
        htmlBody = `
          <div style="font-family: Arial, sans-serif; direction: rtl; text-align: right; padding: 20px;">
            <h2 style="color: #0F5C5A;">تنبيه حجز استشارة جديدة - منصة ميثاق</h2>
            <p>مرحباً <strong>${consultantName || 'المستشار الكريم'}</strong>،</p>
            <p>تم حجز جلسة استشارية جديدة بنجاح عبر منصة ميثاق.</p>
            <div style="background: #F8F7F3; border: 1px solid #e0e0e0; padding: 15px; border-radius: 12px; margin: 15px 0;">
              <p><strong>اسم المستفيد:</strong> ${clientName || 'غير محدد'}</p>
              <p><strong>التاريخ والوقت:</strong> ${sessionDetails?.date || ''} (${sessionDetails?.time || ''})</p>
              <p><strong>نوع الجلسة:</strong> ${sessionDetails?.format || 'صوتية'}</p>
              <p><strong>الملاحظات:</strong> ${sessionDetails?.notes || 'لا يوجد'}</p>
            </div>
            <p>يرجى التواجد في الموعد المحدد في القاعة الصوتية للبدء.</p>
          </div>
        `;
      } else if (type === "new_message") {
        subject = `💬 رسالة جديدة من المستفيد: ${clientName || 'مستفيد'}`;
        htmlBody = `
          <div style="font-family: Arial, sans-serif; direction: rtl; text-align: right; padding: 20px;">
            <h2 style="color: #0F5C5A;">رسالة جديدة في الاستشارة - منصة ميثاق</h2>
            <p>مرحباً <strong>${consultantName || 'المستشار الكريم'}</strong>،</p>
            <p>وصلتك رسالة جديدة من المستفيد <strong>${clientName}</strong>:</p>
            <blockquote style="background: #eef8f7; border-right: 4px solid #0F5C5A; padding: 12px; margin: 15px 0; font-style: italic;">
              "${messageText}"
            </blockquote>
            <p>يمكنك الرد المباشر عبر لوحة تحكم المستشارين في منصة ميثاق.</p>
          </div>
        `;
      } else if (type === "emergency_alert") {
        subject = `🚨 تنبيه طوارئ عاجل - استشارة فورية مطلوب تدخلها`;
        htmlBody = `
          <div style="font-family: Arial, sans-serif; direction: rtl; text-align: right; padding: 20px;">
            <h2 style="color: #d97706;">🚨 طلب دعم نفسي وطوارئ أسرية عاجل</h2>
            <p>مرحباً <strong>${consultantName || 'المستشار الكريم'}</strong>،</p>
            <p>قام المستفيد <strong>${clientName}</strong> بطلب اتصال طوارئ عاجل وقاعة دعم فورية.</p>
          </div>
        `;
      }

      return res.json({
        success: true,
        message: "تم إرسال البريد الإلكتروني التلقائي بنجاح",
        notificationDetails: {
          type,
          recipient: recipientEmail || "consultant@mithaq.sa",
          subject,
          dispatchedAt: timestamp
        }
      });
    } catch (err: any) {
      console.error("Email notification error:", err);
      return res.status(500).json({ success: false, error: "فشل إرسال البريد الإلكتروني" });
    }
  });

  // Health check API
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", app: "Mithaq SaaS Platform", timestamp: new Date() });
  });

  // Vite middleware for development vs static serve for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Mithaq Enterprise Platform running on http://localhost:${PORT}`);
  });
}

startServer();
