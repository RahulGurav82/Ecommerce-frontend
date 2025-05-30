import React from "react";
import { Button } from "../ui/button";
import { StarIcon } from "lucide-react";
import { motion } from "framer-motion";

const StarRatingComponent = ({ rating, handleRatingChange }) => {
  return [1, 2, 3, 4, 5].map((star, idx) => (
    <motion.div 
      key={idx}
      whileHover={handleRatingChange ? { scale: 1.1 } : {}}
      whileTap={handleRatingChange ? { scale: 0.9 } : {}}
    >
      <Button
        variant="ghost"
        size="icon"
        className={`p-0 h-auto w-auto rounded-full ${
          handleRatingChange ? "cursor-pointer" : "cursor-default"
        }`}
        onClick={handleRatingChange ? () => handleRatingChange(star) : null}
      >
        <StarIcon
          className={`w-6 h-6 ${
            star <= rating 
              ? "fill-yellow-500 text-yellow-500" 
              : "fill-muted text-muted-foreground"
          }`}
        />
      </Button>
    </motion.div>
  ));
};

export default StarRatingComponent;