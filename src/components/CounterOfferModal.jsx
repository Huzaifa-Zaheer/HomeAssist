import { motion } from "framer-motion";
import { X } from 'lucide-react';
import { useState } from "react";
import { useEffect } from "react";

const CounterOfferModal = ({ 
  isOpen, 
  onClose, 
  request, 
  onSubmit 
}) => {
  const [counterOffer, setCounterOffer] = useState({
    amount: request?.currentBudget || "",
    message: ""
  });

  const handleSubmit = () => {
    onSubmit({
      amount: parseFloat(counterOffer.amount),
      message: counterOffer.message
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-xl p-6 max-w-md w-full mx-4"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Counter Offer</h3>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Original Budget: ${request?.originalBudget}
            </label>
            <input
              type="number"
              value={counterOffer.amount}
              onChange={(e) => setCounterOffer(prev => ({
                ...prev, 
                amount: e.target.value
              }))}
              className="form-input w-full"
              placeholder="Enter your counter offer amount"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message (Optional)
            </label>
            <textarea
              value={counterOffer.message}
              onChange={(e) => setCounterOffer(prev => ({
                ...prev, 
                message: e.target.value
              }))}
              className="form-textarea w-full"
              rows={3}
              placeholder="Explain your counter offer..."
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="btn btn-outline"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="btn btn-primary"
              disabled={!counterOffer.amount}
            >
              Send Counter Offer
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CounterOfferModal;