import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Home() {
  return (
    <>
      <Button className="w-fit">
        <Plus />
        Add
      </Button>
    </>
  );
}
