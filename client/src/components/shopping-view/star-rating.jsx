import { StarIcon } from "lucide-react";
import { Button } from "../ui/button";

function StarRating({ rating, setrating }) {
  return [1, 2, 3, 4, 5].map((star) => (
    <Button
      variant="ghost"
      size="icon"
      className={`p-2 rounded-full transition-colors hover:bg-muted-foreground ${
        star <= rating
          ? "text-yellow-500 hover:bg-white/50"
          : "hover:bg-primary-foreground/80 text-white/40"
      }`}
      onClick={setrating ? () => setrating(star) : null}
    >
      <StarIcon
        className={`h-8 w-8 ${
          star <= rating ? "fill-yellow-500" : "fill-black/40"
        }`}
      />
    </Button>
  ));
}
export default StarRating;
