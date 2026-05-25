import { json } from "@tanstack/react-start";
import { createAPIFileRoute } from "@tanstack/react-start/api";
import { Resend } from "resend";

export const APIRoute = createAPIFileRoute("/api/contact")({
  POST: async ({ request }) => {
    const data = await request.json();
    const { name, email, company, headcount, idea } = data as {
      name: string;
      email: string;
      company?: string;
      headcount: string;
      idea: string;
    };

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "Eiden Group <contact@eiden-group.com>",
      to: "contact@eiden-group.com",
      replyTo: email,
      subject: `New inquiry from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Company: ${company ?? "N/A"}`,
        `Headcount: ${headcount}`,
        "",
        idea,
      ].join("\n"),
    });

    return json({ ok: true });
  },
});
