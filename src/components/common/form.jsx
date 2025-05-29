import React from "react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
  Sparkles,
} from "lucide-react";

// Enhanced CommonForm with animations
const CommonForm = ({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  isBtnDisabled,
}) => {
  const renderInputByComponentType = (getControlItem, index) => {
    let element = null;
    const value = formData[getControlItem.name] || "";

    switch (getControlItem.componentType) {
      case "input":
        element = (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
            className="relative"
          >
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
              <div className="text-gray-400 transition-colors duration-200">
                {getControlItem.type === "email" && (
                  <Mail className="w-4 h-4" />
                )}
                {getControlItem.type === "password" && (
                  <Lock className="w-4 h-4" />
                )}
                {getControlItem.type === "text" && <User className="w-4 h-4" />}
              </div>
            </div>
            <Input
              name={getControlItem.name}
              placeholder={getControlItem.placeholder}
              id={getControlItem.name}
              type={getControlItem.type}
              value={value}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  [getControlItem.name]: event.target.value,
                })
              }
              className="pl-10 pr-4 py-3 border-2 rounded-xl transition-all duration-200 focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/20 hover:border-gray-300"
            />
          </motion.div>
        );
        break;
      default:
        element = (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
          >
            <Input
              name={getControlItem.name}
              placeholder={getControlItem.placeholder}
              id={getControlItem.name}
              type={getControlItem.type}
              value={value}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  [getControlItem.name]: event.target.value,
                })
              }
              className="py-3 border-2 rounded-xl transition-all duration-200 focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/20 hover:border-gray-300"
            />
          </motion.div>
        );
        break;
    }

    return element;
  };

  return (
    <motion.form
      onSubmit={onSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="flex flex-col gap-4">
        {formControls.map((controlItem, index) => (
          <motion.div
            className="grid w-full gap-2"
            key={controlItem.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
          >
            <label className="text-sm font-medium text-gray-700 mb-1">
              {controlItem.label}
            </label>
            {renderInputByComponentType(controlItem, index)}
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        <Button
          disabled={isBtnDisabled}
          type="submit"
          className="mt-6 w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <span className="flex items-center justify-center gap-2">
            {buttonText || "Submit"}
            <ArrowRight className="w-4 h-4" />
          </span>
        </Button>
      </motion.div>
    </motion.form>
  );
};

export default CommonForm;
