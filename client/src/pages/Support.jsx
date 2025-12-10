//===========correct===========

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Support() {
//   const navigate = useNavigate();
//   const [activeCategory, setActiveCategory] = useState("general");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [contactForm, setContactForm] = useState({
//     name: "",
//     email: "",
//     subject: "",
//     category: "technical",
//     priority: "medium",
//     message: ""
//   });
//   const [submitting, setSubmitting] = useState(false);

//   const faqCategories = {
//     general: [
//       {
//         question: "How do I reset a student's password?",
//         answer: "Go to Student List, find the student, click 'Reset Password' in their profile. An email with reset instructions will be sent automatically."
//       },
//       {
//         question: "Can I bulk upload students?",
//         answer: "Yes, use the CSV import feature in the Student Management section. Download the template file for correct formatting."
//       },
//       {
//         question: "How do I create a new course module?",
//         answer: "Navigate to Modules → Add Module. Fill in the module details and upload materials. You can organize lessons within each module."
//       }
//     ],
//     technical: [
//       {
//         question: "What file formats are supported for upload?",
//         answer: "We support PDF, MP4, JPG, PNG, DOCX, and PPTX files. Maximum file size is 100MB per upload."
//       },
//       {
//         question: "How do I backup my platform data?",
//         answer: "Automatic backups run daily. Manual backups can be initiated from Settings → Advanced → Backup & Restore."
//       },
//       {
//         question: "The platform is running slow, what should I do?",
//         answer: "Check your internet connection first. If issues persist, clear browser cache or try a different browser. Contact support if problem continues."
//       }
//     ],
//     billing: [
//       {
//         question: "How do I upgrade my plan?",
//         answer: "Go to Settings → Billing → Upgrade Plan. Select your desired plan and complete the payment process."
//       },
//       {
//         question: "Can I get a refund?",
//         answer: "We offer 30-day money back guarantee for annual plans. Contact our billing department with your request."
//       }
//     ]
//   };

//   const resources = [
//     {
//       title: "Admin User Guide",
//       description: "Complete guide to managing your LearnStep platform",
//       icon: "📖",
//       link: "#"
//     },
//     {
//       title: "Video Tutorials",
//       description: "Step-by-step video guides for common tasks",
//       icon: "🎥",
//       link: "#"
//     },
//     {
//       title: "API Documentation",
//       description: "Technical documentation for developers",
//       icon: "🔧",
//       link: "#"
//     },
//     {
//       title: "Community Forum",
//       description: "Connect with other LearnStep administrators",
//       icon: "💬",
//       link: "#"
//     }
//   ];

//   const handleSubmitTicket = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);
    
//     // Simulate API call
//     await new Promise(resolve => setTimeout(resolve, 2000));
    
//     setSubmitting(false);
//     alert("Support ticket submitted successfully! We'll get back to you within 24 hours.");
//     setContactForm({
//       name: "",
//       email: "",
//       subject: "",
//       category: "technical",
//       priority: "medium",
//       message: ""
//     });
//   };

//   const ResourceCard = ({ title, description, icon, link }) => (
//     <a href={link} className="block bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
//       <div className="flex items-start space-x-4">
//         <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl">
//           {icon}
//         </div>
//         <div>
//           <h3 className="text-lg font-black text-gray-900 mb-2">{title}</h3>
//           <p className="text-gray-600 text-sm">{description}</p>
//         </div>
//       </div>
//     </a>
//   );

//   const FAQItem = ({ question, answer }) => {
//     const [isOpen, setIsOpen] = useState(false);

//     return (
//       <div className="border-b border-gray-200/50 last:border-b-0">
//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           className="w-full text-left py-6 flex items-center justify-between font-semibold text-gray-900 hover:text-blue-600 transition-colors"
//         >
//           <span>{question}</span>
//           <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
//             ▼
//           </span>
//         </button>
//         {isOpen && (
//           <div className="pb-6">
//             <p className="text-gray-600 leading-relaxed">{answer}</p>
//           </div>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50/30 p-8">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-8">
//         <div>
//           <h1 className="text-4xl font-black text-gray-900 mb-2">Support Center</h1>
//           <p className="text-gray-600 font-medium">Get help and resources for your platform</p>
//         </div>
//         <div className="flex items-center space-x-4">
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search help articles..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-80 px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80"
//             />
//             <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">🔍</span>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Main Content */}
//         <div className="lg:col-span-2 space-y-8">
//           {/* Quick Help Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 text-center">
//               <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">
//                 📞
//               </div>
//               <h3 className="font-black text-gray-900 mb-2">Live Chat</h3>
//               <p className="text-gray-600 text-sm mb-4">Instant help from our team</p>
//               <button className="bg-blue-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-blue-700 transition-colors w-full">
//                 Start Chat
//               </button>
//             </div>

//             <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 text-center">
//               <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">
//                 📧
//               </div>
//               <h3 className="font-black text-gray-900 mb-2">Email Support</h3>
//               <p className="text-gray-600 text-sm mb-4">Get help within 24 hours</p>
//               <button 
//                 onClick={() => document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' })}
//                 className="bg-emerald-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-emerald-700 transition-colors w-full"
//               >
//                 Send Email
//               </button>
//             </div>

//             <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 text-center">
//               <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">
//                 📅
//               </div>
//               <h3 className="font-black text-gray-900 mb-2">Schedule Call</h3>
//               <p className="text-gray-600 text-sm mb-4">Book a 1-on-1 session</p>
//               <button className="bg-purple-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-purple-700 transition-colors w-full">
//                 Book Now
//               </button>
//             </div>
//           </div>

//           {/* FAQ Section */}
//           <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-2xl font-black text-gray-900">Frequently Asked Questions</h2>
//               <div className="flex space-x-2">
//                 {Object.keys(faqCategories).map((category) => (
//                   <button
//                     key={category}
//                     onClick={() => setActiveCategory(category)}
//                     className={`px-4 py-2 rounded-xl font-semibold capitalize transition-colors ${
//                       activeCategory === category
//                         ? "bg-blue-600 text-white"
//                         : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                     }`}
//                   >
//                     {category}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div className="space-y-2">
//               {faqCategories[activeCategory].map((faq, index) => (
//                 <FAQItem key={index} question={faq.question} answer={faq.answer} />
//               ))}
//             </div>
//           </div>

//           {/* Contact Form */}
//           <div id="contact-form" className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50">
//             <h2 className="text-2xl font-black text-gray-900 mb-6">Submit Support Ticket</h2>
//             <form onSubmit={handleSubmitTicket} className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name</label>
//                   <input
//                     type="text"
//                     required
//                     value={contactForm.name}
//                     onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     placeholder="Enter your full name"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
//                   <input
//                     type="email"
//                     required
//                     value={contactForm.email}
//                     onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     placeholder="your@email.com"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
//                 <input
//                   type="text"
//                   required
//                   value={contactForm.subject}
//                   onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="Brief description of your issue"
//                 />
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
//                   <select
//                     value={contactForm.category}
//                     onChange={(e) => setContactForm({...contactForm, category: e.target.value})}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   >
//                     <option value="technical">Technical Issue</option>
//                     <option value="billing">Billing & Payment</option>
//                     <option value="feature">Feature Request</option>
//                     <option value="general">General Inquiry</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">Priority</label>
//                   <select
//                     value={contactForm.priority}
//                     onChange={(e) => setContactForm({...contactForm, priority: e.target.value})}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   >
//                     <option value="low">Low</option>
//                     <option value="medium">Medium</option>
//                     <option value="high">High</option>
//                     <option value="urgent">Urgent</option>
//                   </select>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
//                 <textarea
//                   required
//                   rows="6"
//                   value={contactForm.message}
//                   onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
//                   placeholder="Please describe your issue in detail..."
//                 />
//               </div>

//               <button
//                 type="submit"
//                 disabled={submitting}
//                 className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
//               >
//                 {submitting && (
//                   <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                 )}
//                 <span>{submitting ? "Submitting..." : "Submit Ticket"}</span>
//               </button>
//             </form>
//           </div>
//         </div>

//         {/* Sidebar */}
//         <div className="space-y-8">
//           {/* Resources */}
//           <div>
//             <h3 className="text-xl font-black text-gray-900 mb-4">Helpful Resources</h3>
//             <div className="space-y-4">
//               {resources.map((resource, index) => (
//                 <ResourceCard key={index} {...resource} />
//               ))}
//             </div>
//           </div>

//           {/* Support Info */}
//           <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50">
//             <h3 className="text-xl font-black text-gray-900 mb-4">Support Information</h3>
//             <div className="space-y-4">
//               <div>
//                 <h4 className="font-semibold text-gray-700 mb-2">📞 Phone Support</h4>
//                 <p className="text-gray-600">+1 (555) 123-4567</p>
//                 <p className="text-sm text-gray-500">Mon-Fri, 9AM-6PM EST</p>
//               </div>
//               <div>
//                 <h4 className="font-semibold text-gray-700 mb-2">📧 Email</h4>
//                 <p className="text-gray-600">support@learnstep.com</p>
//                 <p className="text-sm text-gray-500">Response within 24 hours</p>
//               </div>
//               <div>
//                 <h4 className="font-semibold text-gray-700 mb-2">🕒 Emergency</h4>
//                 <p className="text-gray-600">emergency@learnstep.com</p>
//                 <p className="text-sm text-gray-500">Platform downtime issues only</p>
//               </div>
//             </div>
//           </div>

//           {/* System Status */}
//           <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50">
//             <h3 className="text-xl font-black text-gray-900 mb-4">System Status</h3>
//             <div className="space-y-3">
//               <div className="flex items-center justify-between">
//                 <span className="font-medium text-gray-700">Platform</span>
//                 <span className="flex items-center space-x-1 text-emerald-600">
//                   <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
//                   <span className="text-sm font-semibold">Operational</span>
//                 </span>
//               </div>
//               <div className="flex items-center justify-between">
//                 <span className="font-medium text-gray-700">Database</span>
//                 <span className="flex items-center space-x-1 text-emerald-600">
//                   <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
//                   <span className="text-sm font-semibold">Operational</span>
//                 </span>
//               </div>
//               <div className="flex items-center justify-between">
//                 <span className="font-medium text-gray-700">File Uploads</span>
//                 <span className="flex items-center space-x-1 text-amber-600">
//                   <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
//                   <span className="text-sm font-semibold">Degraded</span>
//                 </span>
//               </div>
//               <div className="flex items-center justify-between">
//                 <span className="font-medium text-gray-700">Email Service</span>
//                 <span className="flex items-center space-x-1 text-emerald-600">
//                   <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
//                   <span className="text-sm font-semibold">Operational</span>
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

//=============stylish============


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiSearch,
  FiMessageCircle,
  FiMail,
  FiCalendar,
  FiBook,
  FiVideo,
  FiCode,
  FiUsers,
  FiPhone,
  FiClock,
  FiAlertCircle,
  FiCheckCircle,
  FiHelpCircle,
  FiSend,
  FiDownload,
  FiExternalLink
} from "react-icons/fi";

export default function Support() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("general");
  const [searchQuery, setSearchQuery] = useState("");
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    category: "technical",
    priority: "medium",
    message: ""
  });
  const [submitting, setSubmitting] = useState(false);

  const faqCategories = {
    general: [
      {
        question: "How do I reset a student's password?",
        answer: "Go to Student List, find the student, click 'Reset Password' in their profile. An email with reset instructions will be sent automatically."
      },
      {
        question: "Can I bulk upload students?",
        answer: "Yes, use the CSV import feature in the Student Management section. Download the template file for correct formatting."
      },
      {
        question: "How do I create a new course module?",
        answer: "Navigate to Modules → Add Module. Fill in the module details and upload materials. You can organize lessons within each module."
      }
    ],
    technical: [
      {
        question: "What file formats are supported for upload?",
        answer: "We support PDF, MP4, JPG, PNG, DOCX, and PPTX files. Maximum file size is 100MB per upload."
      },
      {
        question: "How do I backup my platform data?",
        answer: "Automatic backups run daily. Manual backups can be initiated from Settings → Advanced → Backup & Restore."
      },
      {
        question: "The platform is running slow, what should I do?",
        answer: "Check your internet connection first. If issues persist, clear browser cache or try a different browser. Contact support if problem continues."
      }
    ],
    billing: [
      {
        question: "How do I upgrade my plan?",
        answer: "Go to Settings → Billing → Upgrade Plan. Select your desired plan and complete the payment process."
      },
      {
        question: "Can I get a refund?",
        answer: "We offer 30-day money back guarantee for annual plans. Contact our billing department with your request."
      }
    ]
  };

  const resources = [
    {
      title: "Admin User Guide",
      description: "Complete guide to managing your LearnStep platform",
      icon: <FiBook className="text-blue-600" size={24} />,
      link: "#"
    },
    {
      title: "Video Tutorials",
      description: "Step-by-step video guides for common tasks",
      icon: <FiVideo className="text-purple-600" size={24} />,
      link: "#"
    },
    {
      title: "API Documentation",
      description: "Technical documentation for developers",
      icon: <FiCode className="text-green-600" size={24} />,
      link: "#"
    },
    {
      title: "Community Forum",
      description: "Connect with other LearnStep administrators",
      icon: <FiUsers className="text-orange-600" size={24} />,
      link: "#"
    }
  ];

  const handleSubmitTicket = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setSubmitting(false);
    alert("Support ticket submitted successfully! We'll get back to you within 24 hours.");
    setContactForm({
      name: "",
      email: "",
      subject: "",
      category: "technical",
      priority: "medium",
      message: ""
    });
  };

  const ResourceCard = ({ title, description, icon, link }) => (
    <a href={link} className="block bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer">
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-black text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{title}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
        <FiExternalLink className="text-gray-400 group-hover:text-blue-600 transition-colors mt-1" size={18} />
      </div>
    </a>
  );

  const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="border-b border-gray-200/50 last:border-b-0 group">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full text-left py-6 flex items-center justify-between font-semibold text-gray-900 hover:text-blue-600 transition-colors group-hover:bg-blue-50/50 rounded-xl px-4 -mx-4"
        >
          <span className="text-lg">{question}</span>
          <div className={`w-8 h-8 bg-blue-100 rounded-xl flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-blue-600 text-white rotate-180' : 'text-blue-600'}`}>
            <FiHelpCircle size={16} />
          </div>
        </button>
        {isOpen && (
          <div className="pb-6 px-4 -mx-4">
            <p className="text-gray-600 leading-relaxed bg-blue-50/50 rounded-xl p-4 border border-blue-100">{answer}</p>
          </div>
        )}
      </div>
    );
  };

  const SupportCard = ({ title, description, icon, buttonText, color, onClick }) => (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 text-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group">
      <div className={`w-16 h-16 ${color} rounded-2xl flex items-center justify-center text-white mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>
      <h3 className="font-black text-gray-900 mb-2 text-lg">{title}</h3>
      <p className="text-gray-600 text-sm mb-4">{description}</p>
      <button 
        onClick={onClick}
        className={`w-full py-3 rounded-xl font-semibold text-white transition-all duration-300 cursor-pointer transform hover:-translate-y-0.5 hover:shadow-lg ${color.replace('bg-', 'bg-linear-to-r from-')} to-${color.replace('bg-', '').split('-')[0]}-700`}
      >
        {buttonText}
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50/30 p-8">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      
      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/admin")}
              className="flex items-center gap-3 text-gray-600 hover:text-blue-700 font-semibold transition-all duration-300 hover:gap-4 group cursor-pointer bg-white/60 hover:bg-white/80 px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl border border-gray-100"
            >
              <FiArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              Back to Admin
            </button>
            <div>
              <h1 className="text-4xl font-black bg-linear-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent mb-2">
                Support Center
              </h1>
              <p className="text-gray-600 font-medium">Get help and resources for your platform</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" size={20} />
              </div>
              <input
                type="text"
                placeholder="Search help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-80 px-4 py-3 pl-12 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 bg-white/80 transition-all duration-300"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Help Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <SupportCard
                title="Live Chat"
                description="Instant help from our team"
                icon={<FiMessageCircle size={24} />}
                buttonText="Start Chat"
                color="bg-blue-500"
                onClick={() => window.open('https://chat.learnstep.com', '_blank')}
              />
              <SupportCard
                title="Email Support"
                description="Get help within 24 hours"
                icon={<FiMail size={24} />}
                buttonText="Send Email"
                color="bg-emerald-500"
                onClick={() => document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' })}
              />
              <SupportCard
                title="Schedule Call"
                description="Book a 1-on-1 session"
                icon={<FiCalendar size={24} />}
                buttonText="Book Now"
                color="bg-purple-500"
                onClick={() => window.open('https://calendly.com/learnstep-support', '_blank')}
              />
            </div>

            {/* FAQ Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/50">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                    <FiHelpCircle className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-gray-900">Frequently Asked Questions</h2>
                    <p className="text-gray-600">Quick answers to common questions</p>
                  </div>
                </div>
                <div className="flex space-x-2 bg-gray-100 p-1 rounded-2xl">
                  {Object.keys(faqCategories).map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`cursor-pointer px-4 py-2 rounded-xl font-semibold capitalize transition-all duration-300 ${
                        activeCategory === category
                          ? "bg-white text-blue-600 shadow-lg"
                          : "text-gray-700 hover:text-blue-600"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                {faqCategories[activeCategory].map((faq, index) => (
                  <FAQItem className="cursor-pointer" key={index} question={faq.question} answer={faq.answer} />
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div id="contact-form" className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/50">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                  <FiSend className="text-blue-600" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-gray-900">Submit Support Ticket</h2>
                  <p className="text-gray-600">We'll get back to you within 24 hours</p>
                </div>
              </div>
              <form onSubmit={handleSubmitTicket} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Your Name</label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Email Address</label>
                    <input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Subject</label>
                  <input
                    type="text"
                    required
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300"
                    placeholder="Brief description of your issue"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Category</label>
                    <select
                      value={contactForm.category}
                      onChange={(e) => setContactForm({...contactForm, category: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 cursor-pointer"
                    >
                      <option value="technical">Technical Issue</option>
                      <option value="billing">Billing & Payment</option>
                      <option value="feature">Feature Request</option>
                      <option value="general">General Inquiry</option>
                    </select>
                  </div>
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Priority</label>
                    <select
                      value={contactForm.priority}
                      onChange={(e) => setContactForm({...contactForm, priority: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 cursor-pointer"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Message</label>
                  <textarea
                    required
                    rows="6"
                    value={contactForm.message}
                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 resize-none"
                    placeholder="Please describe your issue in detail..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="cursor-pointer w-full bg-linear-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
                >
                  {submitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Submitting Ticket...</span>
                    </>
                  ) : (
                    <>
                      <FiSend size={20} />
                      <span>Submit Support Ticket</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Resources */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-white/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-2xl flex items-center justify-center">
                  <FiDownload className="text-blue-600" size={20} />
                </div>
                <h3 className="text-xl font-black text-gray-900">Helpful Resources</h3>
              </div>
              <div className="space-y-4">
                {resources.map((resource, index) => (
                  <ResourceCard key={index} {...resource} />
                ))}
              </div>
            </div>

            {/* Support Info */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-white/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-emerald-100 rounded-2xl flex items-center justify-center">
                  <FiPhone className="text-emerald-600" size={20} />
                </div>
                <h3 className="text-xl font-black text-gray-900">Support Information</h3>
              </div>
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 bg-blue-50/50 rounded-2xl border border-blue-200/50">
                  <FiPhone className="text-blue-600 mt-1" size={18} />
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-1">Phone Support</h4>
                    <p className="text-gray-600 font-medium">+1 (555) 123-4567</p>
                    <p className="text-sm text-gray-500">Mon-Fri, 9AM-6PM EST</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-emerald-50/50 rounded-2xl border border-emerald-200/50">
                  <FiMail className="text-emerald-600 mt-1" size={18} />
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-1">Email Support</h4>
                    <p className="text-gray-600 font-medium">support@learnstep.com</p>
                    <p className="text-sm text-gray-500">Response within 24 hours</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-red-50/50 rounded-2xl border border-red-200/50">
                  <FiAlertCircle className="text-red-600 mt-1" size={18} />
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-1">Emergency</h4>
                    <p className="text-gray-600 font-medium">emergency@learnstep.com</p>
                    <p className="text-sm text-gray-500">Platform downtime issues only</p>
                  </div>
                </div>
              </div>
            </div>

            {/* System Status */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-white/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-green-100 rounded-2xl flex items-center justify-center">
                  <FiCheckCircle className="text-green-600" size={20} />
                </div>
                <h3 className="text-xl font-black text-gray-900">System Status</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50/50 rounded-2xl border border-green-200/50">
                  <span className="font-medium text-gray-700">Platform</span>
                  <span className="flex items-center space-x-2 text-green-600 font-semibold">
                    <FiCheckCircle size={16} />
                    <span>Operational</span>
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-green-50/50 rounded-2xl border border-green-200/50">
                  <span className="font-medium text-gray-700">Database</span>
                  <span className="flex items-center space-x-2 text-green-600 font-semibold">
                    <FiCheckCircle size={16} />
                    <span>Operational</span>
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-amber-50/50 rounded-2xl border border-amber-200/50">
                  <span className="font-medium text-gray-700">File Uploads</span>
                  <span className="flex items-center space-x-2 text-amber-600 font-semibold">
                    <FiAlertCircle size={16} />
                    <span>Degraded</span>
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-green-50/50 rounded-2xl border border-green-200/50">
                  <span className="font-medium text-gray-700">Email Service</span>
                  <span className="flex items-center space-x-2 text-green-600 font-semibold">
                    <FiCheckCircle size={16} />
                    <span>Operational</span>
                  </span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200/50">
                <p className="text-sm text-gray-500 text-center">
                  Last updated: {new Date().toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}