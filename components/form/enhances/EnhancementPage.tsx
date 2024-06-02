import Link from "next/link";
import React, { useState } from "react";
import Selection from "./Selection";
import {
  MealSelectionPackageForm,
  LaundryAndDryCleaningForm,
  AirportAndLocalTransportation,
} from "./SelectionForm";
import EnhancementAdded from "./EnhancementAdded";

type selectionFormProps = {
  onFormSubmit: (data: any) => void;
  onReset: () => void;
};

const EnhancementPage = () => {
  const [selectedForm, setSelectedForm] = useState<string | null>(null);

  const handleSelect = (choice: string) => {
    setSelectedForm(choice);
  };

  const handleFormSubmit = (data: any) => {
    console.log("Form Data Received:", data);
    // setFormData(data);
  };

  const resetFormSelection = () => {
    setSelectedForm(null);
  };

  const forms: { [key: string]: React.FC<selectionFormProps> } = {
    0: MealSelectionPackageForm,
    1: LaundryAndDryCleaningForm,
    2: AirportAndLocalTransportation,
  };

  const SelectedForm = selectedForm ? forms[selectedForm] : null;

  return (
    <>
      <section className="pt-40">
        <EnhancementAdded />
        {!selectedForm && <Selection onSelect={handleSelect} />}

        {SelectedForm && (
          <SelectedForm
            onFormSubmit={handleFormSubmit}
            onReset={resetFormSelection}
          />
        )}

        <div className="h-auto w-full bg-black mt-10 px-5 py-8">
          <Link
            href="/hotel/enhancements/reservation"
            className="text-white border ml-16 py-2.5 px-4 rounded-full text-xs font-bold hover:text-black hover:bg-white duration-300"
          >
            Skip this section
          </Link>
        </div>
      </section>
    </>
  );
};

export default EnhancementPage;
