import StoreForm from "@/components/shared/Forms/StoreForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

const StorePage = () => {
  return (
    <div className="ml-60">
      <div className="px-5 my-4">
        <Card>
          <CardHeader className="p-6">
            <CardTitle className="text-xl">Store</CardTitle>
            <CardDescription>
              create your own store by one click!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <StoreForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StorePage;
