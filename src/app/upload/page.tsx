"use client";

import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { UploadCloud, CheckCircle2 } from "lucide-react";

export default function UploadPage() {
    const { user } = useUser();
    const [formData, setFormData] = useState({
        name: user?.fullName || "",
        phone: "",
        length: "",
        width: "",
        height: "",
        material: "PLA",
        color: "",
        quantity: "1",
        description: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const materials = ["PLA", "ABS", "PETG", "Resin", "Flexible (TPU)", "Nylon"];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate validation and processing
        setTimeout(() => {
            const { name, phone, length, width, height, material, color, quantity, description } = formData;
            const message = `*CUSTOM 3D PRINT REQUEST* 🛠️\n\n` +
                `*Name:* ${name}\n` +
                `*Phone:* ${phone}\n` +
                `*Dimensions:* ${length} x ${width} x ${height} mm\n` +
                `*Material:* ${material}\n` +
                `*Color Preference:* ${color || 'Any'}\n` +
                `*Quantity:* ${quantity}\n` +
                `*Description:* ${description}\n\n` +
                `_Please also attach the model (.STL/.OBJ) or image in this WhatsApp chat._`;

            const encodedMessage = encodeURIComponent(message);
            window.open(`https://wa.me/919380376606?text=${encodedMessage}`, "_blank");

            setIsSubmitting(false);
            setIsSuccess(true);

            // Save recent requests locally for Dashboard
            const saved = JSON.parse(localStorage.getItem("apex-requests") || "[]");
            saved.push({ ...formData, date: new Date().toISOString(), id: Date.now() });
            localStorage.setItem("apex-requests", JSON.stringify(saved));

            // Reset form (optional)
            setTimeout(() => setIsSuccess(false), 5000);
        }, 1500);
    };

    if (!user) {
        return <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
            <h2 className="text-2xl font-bold mb-4">You need to log in to upload models</h2>
            <a href="/sign-in" className="px-6 py-3 bg-gold-400 text-dark-950 font-bold rounded shadow-glow-gold hover:bg-gold-300">Log In</a>
        </div>;
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center mb-10">
                <h1 className="text-3xl md:text-5xl font-bold mb-4">Upload Your <span className="text-gold-400">3D Model</span></h1>
                <p className="text-gray-400">Fill in the details below and get a quotation via WhatsApp.</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-dark-900 border border-dark-800 p-8 md:p-10 rounded-2xl shadow-xl space-y-8">

                {/* File Upload UI */}
                <div className="border-2 border-dashed border-dark-800 hover:border-gold-400/50 rounded-xl p-10 flex flex-col items-center justify-center text-center transition-colors cursor-pointer bg-dark-950 relative group">
                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10" accept=".stl,.obj,.jpg,.png" />
                    <UploadCloud className="h-12 w-12 text-gold-400 mb-4 group-hover:scale-110 transition-transform duration-300" />
                    <p className="text-lg font-semibold text-white mb-2">Drag & drop your file or click to choose</p>
                    <p className="text-sm text-gray-500">Supports .STL, .OBJ, .PNG, .JPG (Max 50MB)</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Full Name</label>
                        <input required name="name" value={formData.name} onChange={handleChange} type="text" className="w-full bg-dark-950 border border-dark-800 rounded p-3 text-white focus:outline-none focus:border-gold-400 transition-colors" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Phone</label>
                        <input required name="phone" value={formData.phone} onChange={handleChange} type="tel" className="w-full bg-dark-950 border border-dark-800 rounded p-3 text-white focus:outline-none focus:border-gold-400 transition-colors" placeholder="+91 XXXX XXXXX" />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-medium text-gray-300">Dimensions (Length x Width x Height) in mm</label>
                        <div className="grid grid-cols-3 gap-4 border border-dark-950 bg-dark-900">
                            <input required name="length" value={formData.length} onChange={handleChange} type="number" placeholder="L" className="bg-dark-950 border border-dark-800 rounded p-3 text-white text-center focus:outline-none focus:border-gold-400" />
                            <input required name="width" value={formData.width} onChange={handleChange} type="number" placeholder="W" className="bg-dark-950 border border-dark-800 rounded p-3 text-white text-center focus:outline-none focus:border-gold-400" />
                            <input required name="height" value={formData.height} onChange={handleChange} type="number" placeholder="H" className="bg-dark-950 border border-dark-800 rounded p-3 text-white text-center focus:outline-none focus:border-gold-400" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Material Preference</label>
                        <select name="material" value={formData.material} onChange={handleChange} className="w-full bg-dark-950 border border-dark-800 rounded p-3 text-white focus:outline-none focus:border-gold-400 appearance-none">
                            {materials.map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Color Preference</label>
                        <input name="color" value={formData.color} onChange={handleChange} type="text" className="w-full bg-dark-950 border border-dark-800 rounded p-3 text-white focus:outline-none focus:border-gold-400 transition-colors" placeholder="e.g. Matte Black, Gold, Any" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Quantity</label>
                        <input required name="quantity" value={formData.quantity} onChange={handleChange} type="number" min="1" className="w-full bg-dark-950 border border-dark-800 rounded p-3 text-white focus:outline-none focus:border-gold-400 transition-colors" />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-medium text-gray-300">Project Description</label>
                        <textarea required name="description" value={formData.description} onChange={handleChange} rows={4} className="w-full bg-dark-950 border border-dark-800 rounded p-3 text-white focus:outline-none focus:border-gold-400 transition-colors resize-none" placeholder="Does it need assembly? Post-processing? Smoothing? Tell us here." />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting || isSuccess}
                    className="w-full py-4 bg-gold-400 hover:bg-gold-500 text-dark-950 font-bold text-lg rounded-lg shadow-glow-gold hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isSubmitting ? (
                        <span className="flex items-center gap-2"><div className="w-5 h-5 border-2 border-dark-950 border-t-transparent rounded-full animate-spin"></div> Generating Quote...</span>
                    ) : isSuccess ? (
                        <span className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5" /> Submitting Request...</span>
                    ) : (
                        "Request Quotation on WhatsApp"
                    )}
                </button>
            </form>
        </div>
    );
}
