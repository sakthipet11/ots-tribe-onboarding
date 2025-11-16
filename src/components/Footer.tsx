import { Music } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Music className="h-6 w-6 text-primary" />
              </div>
              <span className="text-xl font-bold">OTS Tribe</span>
            </div>
            <p className="text-sm text-muted-foreground">
              A community of street musicians practicing together, 7 minutes at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#what-is-tribe" className="hover:text-primary transition-colors">
                  What is Tribe
                </a>
              </li>
              <li>
                <a href="#apply" className="hover:text-primary transition-colors">
                  Apply to Join
                </a>
              </li>
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  Main Website
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold">Get in Touch</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="mailto:tribe@onthestreets.in" className="hover:text-primary transition-colors">
                  tribe@onthestreets.in
                </a>
              </li>
              <li>
                <p>Questions? We're here to help!</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} OnTheStreets. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <span>•</span>
            <a href="#" className="hover:text-primary transition-colors">
              Terms of Service
            </a>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-muted-foreground">
          <p>
            Your data is stored securely and will only be used for OTS Tribe communications. 
            We never share your information with third parties.
          </p>
        </div>
      </div>
    </footer>
  );
};