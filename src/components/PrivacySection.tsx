export const PrivacySection = () => {
  return (
    <section
      id="privacy"
      className="py-20 md:py-28 border-t border-border bg-surface/20 scroll-mt-24"
      aria-labelledby="privacy-heading"
    >
      <div className="container max-w-3xl">
        <h2
          id="privacy-heading"
          className="font-display font-bold text-2xl md:text-3xl tracking-tight"
        >
          Privacy policy
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">Effective date: April 27, 2026</p>

        <div className="mt-10 space-y-8 text-sm text-muted-foreground leading-relaxed">
          <div>
            <h3 className="font-display font-semibold text-foreground text-base mb-2">
              This website
            </h3>
            <p>
              This marketing site is static content served to your browser. We do not run
              first-party analytics on this page by default. If you use the interest form below
              the fold, see the waitlist section for how that data is handled in your deployment.
            </p>
          </div>

          <div>
            <h3 className="font-display font-semibold text-foreground text-base mb-2">
              ClipMate extension (when installed)
            </h3>
            <p>
              ClipMate is designed to process and store clipboard-related data locally in your
              browser. It does not require an account for core functionality. Sensitive categories
              (such as one-time codes) are intended to be short-lived according to the product
              settings described on this site. Review the permissions shown on the Chrome Web Store
              listing before installing any version you download from there.
            </p>
          </div>

          <div>
            <h3 className="font-display font-semibold text-foreground text-base mb-2">
              Waitlist on this site
            </h3>
            <p>
              Unless you replace the default behavior with your own backend, email addresses
              submitted through the form may be stored only in the visitor&apos;s browser
              (localStorage) for demonstration purposes. For a production launch, connect the form
              to your email service or CRM and publish an updated policy that matches your data
              processing.
            </p>
          </div>

          <div>
            <h3 className="font-display font-semibold text-foreground text-base mb-2">Changes</h3>
            <p>
              We may update this policy as the product and hosting setup evolve. The effective date
              at the top will change when material updates are published.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
