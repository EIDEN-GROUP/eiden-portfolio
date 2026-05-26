import { createTransport } from "npm:nodemailer@6";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { name, email, company, headcount, idea } = await req.json();

    const smtpHost = Deno.env.get("SMTP_HOST");
    const smtpPort = Number(Deno.env.get("SMTP_PORT") ?? 587);
    const smtpSecure = Deno.env.get("SMTP_SECURE") === "true";
    const smtpUser = Deno.env.get("SMTP_USER");

    const transporter = createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: Deno.env.get("SMTP_PASS"),
      },
    });

    await transporter.sendMail({
      from: `"Eiden Group" <${smtpUser}>`,
      to: "contact@eiden-group.com",
      replyTo: email,
      subject: `New inquiry from ${name}`,
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=DM+Serif+Display:ital@0;1&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=Inter:wght@300;400;500;600;700&display=swap');
  </style>
</head>
<body style="margin:0;padding:0;background:#FEFDFB;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#FEFDFB;padding:48px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;background:#FFFFFF;border-radius:0;">

          <!-- Top Border Accent -->
          <tr>
            <td style="background:linear-gradient(90deg,#0C5752 0%,#0E7A73 50%,#CFC292 100%);height:3px;"></td>
          </tr>

          <!-- Header -->
          <tr>
            <td style="background:#FEFDFB;padding:48px 40px;text-align:center;border-bottom:1px solid #E8DCC8;">
              <p style="margin:0 0 8px;font-family:'Cormorant Garamond',serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#0C5752;font-weight:600;">New Project</p>
              <p style="margin:0;font-family:'Outfit',sans-serif;font-size:32px;font-weight:800;color:#122620;letter-spacing:-0.02em;">Inquiry Received</p>
              <p style="margin:12px 0 0;font-family:'DM Serif Display',serif;font-style:italic;font-size:16px;color:#0E7A73;">Where chaos becomes architecture</p>
            </td>
          </tr>

          <!-- Sender Section -->
          <tr>
            <td style="background:#FFFFFF;padding:40px;border-bottom:1px solid #E8DCC8;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="border-left:3px solid #0C5752;padding-left:20px;">
                    <p style="margin:0 0 6px;font-family:'Cormorant Garamond',serif;font-size:9px;letter-spacing:2px;text-transform:uppercase;color:#0C5752;font-weight:600;">From</p>
                    <p style="margin:0 0 4px;font-family:'Outfit',sans-serif;font-size:20px;font-weight:700;color:#122620;">${name}</p>
                    <a href="mailto:${email}" style="font-family:'Inter',sans-serif;font-size:13px;color:#0E7A73;text-decoration:none;font-weight:500;">${email}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Details Grid with Card System -->
          <tr>
            <td style="background:#FFFFFF;padding:40px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:0;">
                <tr>
                  <td width="50%" style="padding-right:16px;padding-bottom:20px;">
                    <div style="border-top:3px solid #CFC292;padding-top:16px;">
                      <p style="margin:0 0 8px;font-family:'Cormorant Garamond',serif;font-size:9px;letter-spacing:2px;text-transform:uppercase;color:#122620;font-weight:600;">Company</p>
                      <p style="margin:0;font-family:'Outfit',sans-serif;font-size:15px;font-weight:600;color:#122620;">${company ?? "—"}</p>
                    </div>
                  </td>
                  <td width="50%" style="padding-left:16px;padding-bottom:20px;">
                    <div style="border-top:3px solid #34D399;padding-top:16px;">
                      <p style="margin:0 0 8px;font-family:'Cormorant Garamond',serif;font-size:9px;letter-spacing:2px;text-transform:uppercase;color:#122620;font-weight:600;">Team Size</p>
                      <p style="margin:0;font-family:'Outfit',sans-serif;font-size:15px;font-weight:600;color:#122620;">${headcount} employees</p>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Project Brief Card -->
          <tr>
            <td style="background:#FFFFFF;padding:0 40px 40px;">
              <div style="background:#F4EBD0;border-left:4px solid #0C5752;padding:24px;border-radius:0;">
                <p style="margin:0 0 12px;font-family:'Cormorant Garamond',serif;font-size:9px;letter-spacing:2px;text-transform:uppercase;color:#122620;font-weight:600;">Project Brief</p>
                <p style="margin:0;font-family:'Inter',sans-serif;font-size:14px;line-height:1.8;color:#122620;font-weight:400;">${idea.replace(/\n/g, "<br/>")}</p>
              </div>
            </td>
          </tr>

          <!-- CTA Section -->
          <tr>
            <td style="background:#FFFFFF;padding:40px;text-align:center;border-top:1px solid #E8DCC8;">
              <a href="mailto:${email}" style="display:inline-block;padding:14px 40px;background:#CFC292;color:#122620;font-family:'Outfit',sans-serif;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;text-decoration:none;border-radius:100px;">
                Reply to ${name}
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#122620;padding:32px 40px;text-align:center;">
              <p style="margin:0 0 8px;font-family:'Inter',sans-serif;font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#CFC292;font-weight:600;">Eiden Group</p>
              <p style="margin:0;font-family:'Inter',sans-serif;font-size:11px;color:#E8DCC8;letter-spacing:0.5px;">
                <a href="mailto:contact@eiden-group.com" style="color:#CFC292;text-decoration:none;">contact@eiden-group.com</a> · Agadir Bay, Morocco
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
    });

    await transporter.sendMail({
      from: `"Eiden Group" <${smtpUser}>`,
      to: email,
      subject: "We received your inquiry — Eiden Group",
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=DM+Serif+Display:ital@0;1&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=Inter:wght@300;400;500;600;700&display=swap');
  </style>
</head>
<body style="margin:0;padding:0;background:#FEFDFB;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#FEFDFB;padding:48px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;background:#FFFFFF;border-radius:0;">

          <!-- Top Border Accent -->
          <tr>
            <td style="background:linear-gradient(90deg,#0C5752 0%,#0E7A73 50%,#CFC292 100%);height:3px;"></td>
          </tr>

          <!-- Header -->
          <tr>
            <td style="background:#122620;padding:56px 40px;text-align:center;">
              <p style="margin:0 0 12px;font-size:40px;">✓</p>
              <p style="margin:0 0 8px;font-family:'Cormorant Garamond',serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#CFC292;font-weight:600;">Thank You</p>
              <p style="margin:0;font-family:'Outfit',sans-serif;font-size:36px;font-weight:800;color:#FFFFFF;letter-spacing:-0.02em;">We're on it</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="background:#FFFFFF;padding:48px 40px;">
              <p style="margin:0 0 24px;font-family:'DM Serif Display',serif;font-size:18px;font-style:italic;color:#0C5752;">Hi ${name},</p>
              
              <p style="margin:0 0 20px;font-family:'Inter',sans-serif;font-size:14px;line-height:1.85;color:#122620;">
                Thank you for reaching out to EIDEN Group. We've received your inquiry and our team is already reviewing your details.
              </p>

              <p style="margin:0 0 32px;font-family:'Inter',sans-serif;font-size:14px;line-height:1.85;color:#122620;">
                A member of our team will contact you within <strong style="color:#0C5752;">one business day</strong> to discuss your project and schedule your <strong style="color:#0C5752;">Hydra Analysis™</strong> session.
              </p>

              <!-- Brief Recap Card -->
              <div style="background:#F4EBD0;border-left:4px solid #0E7A73;padding:24px;margin-bottom:32px;">
                <p style="margin:0 0 12px;font-family:'Cormorant Garamond',serif;font-size:9px;letter-spacing:2px;text-transform:uppercase;color:#122620;font-weight:600;">Your Project Brief</p>
                <p style="margin:0;font-family:'Inter',sans-serif;font-size:13px;line-height:1.8;color:#122620;">${idea.replace(/\n/g, "<br/>")}</p>
              </div>

              <p style="margin:0;font-family:'Inter',sans-serif;font-size:13px;color:#122620;line-height:1.85;">
                Questions in the meantime?<br/>
                <a href="mailto:contact@eiden-group.com" style="color:#0E7A73;text-decoration:none;font-weight:600;">Get in touch with us</a>
              </p>
            </td>
          </tr>

          <!-- Signature -->
          <tr>
            <td style="background:#F8F3E8;padding:32px 40px;border-top:1px solid #E8DCC8;">
              <p style="margin:0 0 4px;font-family:'Outfit',sans-serif;font-size:13px;font-weight:700;color:#122620;">The EIDEN Group Team</p>
              <p style="margin:0 0 12px;font-family:'Inter',sans-serif;font-size:12px;color:#0C5752;">
                <a href="mailto:contact@eiden-group.com" style="color:#0C5752;text-decoration:none;font-weight:600;">contact@eiden-group.com</a>
              </p>
              <p style="margin:0;font-family:'Inter',sans-serif;font-size:11px;color:#122620;">
                Agadir Bay, Technopole 1<br/>Bloc B, Agadir 80000
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#122620;padding:28px 40px;text-align:center;">
              <p style="margin:0;font-family:'Inter',sans-serif;font-size:10px;color:#CFC292;letter-spacing:1px;">© EIDEN Group · Where chaos becomes architecture</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
    });

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});