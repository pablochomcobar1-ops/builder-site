import { useState } from "react";
import type { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Phone, Mail, Clock, Loader2, ArrowRight } from "lucide-react";
import RevealHeading from "@/components/common/RevealHeading";

const ease = [0.22, 1, 0.36, 1] as const;

/* ---------- Validation rules ---------- */
const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  email: z.string().email("Enter a valid email address"),
  projectType: z.enum(["Residential", "Commercial", "Villa", "Renovation"], {
    message: "Choose a project type",
  }),
  message: z.string().min(10, "Tell us a little more (at least 10 characters)"),
});
type FormValues = z.infer<typeof schema>;

/* ---------- Placeholder contact info (replace with real) ---------- */
const info = [
  {
    icon: MapPin,
    label: "Office",
    value: "Aakar House, SG Highway, Ahmedabad",
  },
  { icon: Phone, label: "Phone", value: "+91 90000 00000" },
  { icon: Mail, label: "Email", value: "hello@aakarbuilders.com" },
  { icon: Clock, label: "Hours", value: "Mon – Sat, 10 am – 7 pm" },
];

/* ---------- Reusable field wrapper ---------- */
function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-concrete-700">
        {label}
      </span>
      {children}
      <AnimatePresence>
        {error && (
          <motion.span
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="mt-1.5 block text-sm text-brick"
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </label>
  );
}

const inputClass =
  "w-full rounded-xl border border-concrete-200 bg-concrete-50 px-4 py-3 text-concrete-900 outline-none transition placeholder:text-concrete-400 focus:border-concrete-900 focus:bg-white aria-[invalid=true]:border-brick";

/* ---------- Section ---------- */
export default function Contact() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    // TODO: replace with a real email service / backend later
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("New enquiry:", data);
    setSent(true);
    reset();
  };

  return (
    <section id="contact" className="bg-concrete-100 px-6 py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2">
        {/* Left: heading + info */}
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-brick">
            Contact
          </p>
          <RevealHeading text="Let's build something that lasts." />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-6 max-w-md text-lg text-concrete-500"
          >
            Tell us about your plot, your plan or your dream home. We reply
            within one working day.
          </motion.p>

          <ul className="mt-12 space-y-6">
            {info.map((item, i) => (
              <motion.li
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1, ease }}
                className="flex items-start gap-4"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-concrete-50 text-concrete-900">
                  <item.icon size={18} />
                </span>
                <div>
                  <p className="text-sm text-concrete-400">{item.label}</p>
                  <p className="font-semibold">{item.value}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Right: form card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease }}
          className="rounded-3xl bg-white p-8 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.25)] md:p-10"
        >
          <AnimatePresence mode="wait">
            {sent ? (
              /* ----- Success state ----- */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease }}
                className="flex min-h-[480px] flex-col items-center justify-center text-center"
              >
                <svg width="80" height="80" viewBox="0 0 72 72">
                  <motion.circle
                    cx="36"
                    cy="36"
                    r="32"
                    fill="none"
                    stroke="#c8642c"
                    strokeWidth="4"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6, ease }}
                  />
                  <motion.path
                    d="M22 37 L32 47 L51 27"
                    fill="none"
                    stroke="#c8642c"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.4, delay: 0.5, ease }}
                  />
                </svg>
                <h3 className="mt-6 text-3xl font-extrabold">
                  Enquiry received.
                </h3>
                <p className="mt-2 max-w-xs text-concrete-500">
                  Thank you! Our team will call you within one working day.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-8 text-sm font-semibold text-concrete-700 underline underline-offset-4 hover:text-brick"
                >
                  Send another enquiry
                </button>
              </motion.div>
            ) : (
              /* ----- Form ----- */
              <motion.form
                key="form"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-5"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Full name" error={errors.name?.message}>
                    <input
                      {...register("name")}
                      aria-invalid={!!errors.name}
                      placeholder="Your name"
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Mobile number" error={errors.phone?.message}>
                    <input
                      {...register("phone")}
                      aria-invalid={!!errors.phone}
                      placeholder="98XXXXXXXX"
                      inputMode="numeric"
                      maxLength={10}
                      className={inputClass}
                    />
                  </Field>
                </div>

                <Field label="Email" error={errors.email?.message}>
                  <input
                    {...register("email")}
                    aria-invalid={!!errors.email}
                    type="email"
                    placeholder="you@example.com"
                    className={inputClass}
                  />
                </Field>

                <Field label="Project type" error={errors.projectType?.message}>
                  <select
                    {...register("projectType")}
                    aria-invalid={!!errors.projectType}
                    defaultValue=""
                    className={inputClass}
                  >
                    <option value="" disabled>
                      Select one
                    </option>
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Villa">Villa / Private home</option>
                    <option value="Renovation">Renovation</option>
                  </select>
                </Field>

                <Field label="Message" error={errors.message?.message}>
                  <textarea
                    {...register("message")}
                    aria-invalid={!!errors.message}
                    rows={4}
                    placeholder="Plot size, location, budget, timeline..."
                    className={`${inputClass} resize-none`}
                  />
                </Field>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group flex w-full items-center justify-center gap-2 rounded-full bg-concrete-900 px-6 py-4 font-semibold text-concrete-50 transition-colors hover:bg-brick disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" /> Sending...
                    </>
                  ) : (
                    <>
                      Send enquiry
                      <ArrowRight
                        size={18}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
