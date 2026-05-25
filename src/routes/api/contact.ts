import { createServerFn } from "@tanstack/react-start";
import { Resend } from "resend";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  company: z.string().optional(),
  headcount: z.string(),
  idea: z.string(),
});

type ContactData = z.infer<typeof contactSchema>;

export const sendContactEmail = createServerFn({ method: "POST" })
  .inputValidator((data: ContactData) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "Eiden Group <contact@eiden-group.com>",
      to: "contact@eiden-group.com",
      replyTo: data.email,
      subject: `New inquiry from ${data.name}`,
      text: [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Company: ${data.company ?? "N/A"}`,
        `Headcount: ${data.headcount}`,
        "",
        data.idea,
      ].join("\n"),
    });

    return { ok: true };
  });
