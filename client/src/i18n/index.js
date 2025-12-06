import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
const resources = {
  en: {
    translation: {
      // Navigation
      "nav.servers": "Servers",
      "nav.vps": "VPS Servers",
      "nav.cloud": "Cloud Servers",
      "nav.dedicated": "Dedicated Servers",
      "nav.domains": "Domains",
      "nav.security": "Security & Tools",
      "nav.ssl": "SSL Certificates",
      "nav.emails": "Professional Emails",
      "nav.backup": "Website Backup",
      "nav.datacenters": "Data Centers",
      "nav.support": "Support",
      "nav.login": "Login",
      "nav.signup": "Sign Up",
      
      // Homepage
      "home.hero.title": "Premium Hosting Provider",
      "home.hero.subtitle": "Enterprise-grade infrastructure with 99.9% uptime guarantee",
      "home.cta.getstarted": "Get Started",
      "home.cta.viewplans": "View Plans",
      
      // Common
      "common.loading": "Loading...",
      "common.save": "Save",
      "common.cancel": "Cancel",
      "common.delete": "Delete",
      "common.edit": "Edit",
      "common.add": "Add",
      "common.search": "Search",
      "common.filter": "Filter",
      "common.status": "Status",
      "common.actions": "Actions",
      
      // Cart
      "cart.title": "Shopping Cart",
      "cart.empty": "Your cart is empty",
      "cart.checkout": "Proceed to Checkout",
      "cart.subtotal": "Subtotal",
      "cart.total": "Total",
      
      // Admin
      "admin.dashboard": "Dashboard",
      "admin.products": "Products",
      "admin.users": "Users",
      "admin.orders": "Orders",
      "admin.pricing": "Pricing",
      "admin.settings": "Settings",
    }
  },
  bn: {
    translation: {
      // Navigation
      "nav.servers": "সার্ভার",
      "nav.vps": "ভিপিএস সার্ভার",
      "nav.cloud": "ক্লাউড সার্ভার",
      "nav.dedicated": "ডেডিকেটেড সার্ভার",
      "nav.domains": "ডোমেইন",
      "nav.security": "নিরাপত্তা ও টুলস",
      "nav.ssl": "এসএসএল সার্টিফিকেট",
      "nav.emails": "প্রফেশনাল ইমেইল",
      "nav.backup": "ওয়েবসাইট ব্যাকআপ",
      "nav.datacenters": "ডেটা সেন্টার",
      "nav.support": "সাপোর্ট",
      "nav.login": "লগইন",
      "nav.signup": "সাইন আপ",
      
      // Homepage
      "home.hero.title": "প্রিমিয়াম হোস্টিং প্রদানকারী",
      "home.hero.subtitle": "৯৯.৯% আপটাইম গ্যারান্টি সহ এন্টারপ্রাইজ-গ্রেড অবকাঠামো",
      "home.cta.getstarted": "শুরু করুন",
      "home.cta.viewplans": "প্ল্যান দেখুন",
      
      // Common
      "common.loading": "লোড হচ্ছে...",
      "common.save": "সংরক্ষণ",
      "common.cancel": "বাতিল",
      "common.delete": "মুছুন",
      "common.edit": "সম্পাদনা",
      "common.add": "যোগ করুন",
      "common.search": "অনুসন্ধান",
      "common.filter": "ফিল্টার",
      "common.status": "স্ট্যাটাস",
      "common.actions": "কার্যক্রম",
      
      // Cart
      "cart.title": "শপিং কার্ট",
      "cart.empty": "আপনার কার্ট খালি",
      "cart.checkout": "চেকআউট করুন",
      "cart.subtotal": "সাবটোটাল",
      "cart.total": "মোট",
      
      // Admin
      "admin.dashboard": "ড্যাশবোর্ড",
      "admin.products": "পণ্য",
      "admin.users": "ব্যবহারকারী",
      "admin.orders": "অর্ডার",
      "admin.pricing": "মূল্য",
      "admin.settings": "সেটিংস",
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
