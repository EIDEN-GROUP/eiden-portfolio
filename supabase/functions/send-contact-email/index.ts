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

    console.log("SMTP config", {
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      user: smtpUser,
      passSet: !!Deno.env.get("SMTP_PASS"),
    });

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
</head>
<body style="margin:0;padding:0;background:#f5f4f0;font-family:'Georgia',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f4f0;padding:48px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;">

          <!-- Header -->
          <tr>
            <td style="background:#1a2e1a;padding:36px 40px;text-align:center;">
              <p style="margin:0;font-family:'Georgia',serif;font-size:11px;letter-spacing:0.4em;text-transform:uppercase;color:#c9a84c;">Eiden Group</p>
              <p style="margin:8px 0 0;font-family:'Georgia',serif;font-size:22px;color:#fff;font-style:italic;font-weight:400;">New Project Inquiry</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#ffffff;padding:40px 40px 32px;">

              <!-- Sender info -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                <tr>
                  <td style="padding-bottom:16px;border-bottom:1px solid #ece9e2;">
                    <p style="margin:0 0 4px;font-size:9px;letter-spacing:0.35em;text-transform:uppercase;color:#a09a8e;font-family:Arial,sans-serif;">From</p>
                    <p style="margin:0;font-size:18px;color:#1a2e1a;font-family:'Georgia',serif;">${name}</p>
                    <a href="mailto:${email}" style="font-size:13px;color:#c9a84c;text-decoration:none;font-family:Arial,sans-serif;">${email}</a>
                  </td>
                </tr>
              </table>

              <!-- Details grid -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                <tr>
                  <td width="50%" style="padding:0 12px 0 0;vertical-align:top;">
                    <p style="margin:0 0 4px;font-size:9px;letter-spacing:0.35em;text-transform:uppercase;color:#a09a8e;font-family:Arial,sans-serif;">Company</p>
                    <p style="margin:0;font-size:14px;color:#2d2d2d;font-family:'Georgia',serif;">${company ?? "—"}</p>
                  </td>
                  <td width="50%" style="padding:0 0 0 12px;vertical-align:top;">
                    <p style="margin:0 0 4px;font-size:9px;letter-spacing:0.35em;text-transform:uppercase;color:#a09a8e;font-family:Arial,sans-serif;">Headcount</p>
                    <p style="margin:0;font-size:14px;color:#2d2d2d;font-family:'Georgia',serif;">${headcount} employees</p>
                  </td>
                </tr>
              </table>

              <!-- Brief -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:#f9f8f5;border-left:3px solid #c9a84c;padding:20px 24px;">
                    <p style="margin:0 0 8px;font-size:9px;letter-spacing:0.35em;text-transform:uppercase;color:#a09a8e;font-family:Arial,sans-serif;">Project Brief</p>
                    <p style="margin:0;font-size:14px;line-height:1.75;color:#2d2d2d;font-family:'Georgia',serif;font-style:italic;">${idea.replace(/\n/g, "<br/>")}</p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Reply CTA -->
          <tr>
            <td style="background:#ffffff;padding:0 40px 40px;text-align:center;">
              <a href="mailto:${email}" style="display:inline-block;margin-top:8px;padding:14px 36px;background:#1a2e1a;color:#c9a84c;font-family:Arial,sans-serif;font-size:10px;letter-spacing:0.35em;text-transform:uppercase;text-decoration:none;">
                Reply to ${name}
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px;text-align:center;">
              <p style="margin:0;font-size:10px;color:#a09a8e;font-family:Arial,sans-serif;letter-spacing:0.1em;">© Eiden Group · contact@eiden-group.com</p>
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

    console.log("Email sent successfully to contact@eiden-group.com");
    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Failed to send email:", (error as Error).message);
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
