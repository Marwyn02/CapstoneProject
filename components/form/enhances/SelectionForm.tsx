import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useStore from "@/store/store";
import { useRouter } from "next/router";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type selectionFormProps = {
  onFormSubmit: (data: any) => void;
  onReset: () => void;
};

type searchParamProps = {
  laundryChoice: string;
  laundryPrice: string;
};

export const MealSelectionPackageForm = ({ onReset }: selectionFormProps) => {
  return (
    <div className="px-40 py-14">
      <p>Whole Day Meal Package</p>
      <form>
        <div>
          <Input type="text" />
        </div>
      </form>
      <button onClick={() => onReset()}>Back</button>
    </div>
  );
};

export const LaundryAndDryCleaningForm = ({ onReset }: selectionFormProps) => {
  const { register, handleSubmit, setValue, watch } = useForm();
  const { setServices } = useStore();
  const router = useRouter();

  const onSubmit = (data: any) => {
    const [selectedTitle, selectedPrice] = data.option.split("|");

    if (data.request !== "") {
      setServices({
        laundry: {
          choice: selectedTitle,
          price: selectedPrice,
          request: data.request,
        },
      });
    } else {
      setServices({
        laundry: {
          choice: selectedTitle,
          price: selectedPrice,
          request: "",
        },
      });
    }
    onReset();
  };

  const selectedOption = watch("option");

  useEffect(() => {
    const { laundryChoice, laundryPrice } = router.query as searchParamProps;

    if (laundryChoice && laundryPrice) {
      setValue("option", `${laundryChoice}|${laundryPrice}`);
    }
  }, [router.query, setValue]);

  const data = [
    {
      title: "Laundry",
      price: 500,
    },
    {
      title: "Dry Cleaning",
      price: 800,
    },
    {
      title: "Both",
      price: 1250,
    },
  ];
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-6 gap-x-4"
      >
        {/* Laundry and Dry Cleaning Service Details */}
        <div className="col-start-2 col-span-2 space-y-2">
          <p className="font-serif font-thin">
            Laundry and Dry Cleaning Service
          </p>
          <p className="text-sm">
            Welcome to our Laundry and Dry Cleaning Service! To ensure the best
            care and handling of your garments, please take a moment to review
            the following important information and conditions:
          </p>
          {/* Service Details */}
          <div className="text-sm font-light pt-2">
            <h4 className="font-medium">Service Details</h4>
            <ul className="list-inside list-disc">
              <li>
                Laundry Service: This includes washing, drying, and folding of
                your everyday clothing items. Please separate delicate items
                from regular wash items.
              </li>
              <li>
                Dry Cleaning Service: Recommended for suits, dresses, and other
                delicate garments that require special handling. These items
                will be carefully treated to preserve their quality and
                appearance.
              </li>
            </ul>
          </div>
          {/* Pickup and delivery */}
          <div className="text-sm font-light pt-2">
            <h4 className="font-medium">Delivery</h4>
            <ul className="list-inside list-disc">
              <li>
                Delivery Times: Our standard delivery time is within 24 hours
                from pickup.
              </li>
            </ul>
          </div>
          {/* Item Handling */}
          <div className="text-sm font-light pt-2">
            <h4 className="font-medium">Item Handling</h4>
            <ul className="list-inside list-disc">
              <li>
                Special Instructions: If you have any specific instructions,
                such as stain removal or handling of delicate items, please
                indicate them clearly in the special instructions section of the
                form.
              </li>
              <li>
                Damage and Loss: While we take utmost care in handling your
                garments, we are not responsible for damage to items due to
                inherent defects, color bleeding, or shrinkage. We recommend
                avoiding sending highly valuable or irreplaceable items.
              </li>
            </ul>
          </div>

          <div className="text-sm font-light pt-2">
            <h4 className="font-medium">Additional Services</h4>
            <ul className="list-inside list-disc">
              <li>
                Express Service: Need your items back quickly? Opt for our
                express service for same-day delivery.
              </li>
              <li>
                Folding: Your laundry will be neatly folded and ready for
                storage or use.
              </li>
              <li>
                Hanging: If preferred, your items will be returned on hangers,
                ready to wear.
              </li>
            </ul>
          </div>

          <div className="text-sm font-light pt-2">
            <h4 className="font-medium">Conditions</h4>
            <ul className="list-inside list-disc">
              <li>
                Item Limitations: For hygiene and safety reasons, we do not
                accept items that are heavily soiled with bodily fluids,
                chemicals, or hazardous materials.
              </li>
              <li>
                Payment: Charges for the service will be added to your room
                bill. Please ensure to review your bill upon checkout.
              </li>
              <li>
                Contact Information: In case we need to reach you for any
                clarifications regarding your laundry, please ensure your
                contact information is up to date.
              </li>
            </ul>
          </div>
          <p className="text-sm font-light pt-2">
            We appreciate your trust in our laundry and dry cleaning service.
            Our goal is to provide you with the highest level of care and
            convenience during your stay. If you have any questions or concerns,
            please do not hesitate to contact our housekeeping department. Thank
            you for choosing our service!
          </p>
        </div>

        {/* Laundry and Dry Cleaning Service Form */}
        <div className="col-start-4 col-span-2 space-y-4">
          <Label htmlFor="radio">Choose service:</Label>
          <RadioGroup
            id="radio"
            onValueChange={(value) => setValue("option", value)}
            value={selectedOption}
          >
            {data.map((d, i) => (
              <div key={d.title} className="flex items-center">
                <RadioGroupItem
                  value={`${d.title}|${d.price}`}
                  id={d.title}
                  className="peer hidden"
                />
                <Label
                  htmlFor={d.title}
                  className="flex justify-between w-full cursor-pointer border border-transparent rounded-md bg-gray-50 p-8 font-normal hover:border-black duration-300 peer-aria-checked:border peer-aria-checked:border-black"
                >
                  <p>{d.title}</p>
                  <p>
                    PHP{d.price}{" "}
                    <span className="text-xs text-gray-500">/ 8kg</span>
                  </p>
                </Label>
              </div>
            ))}
          </RadioGroup>

          <input type="hidden" {...register("option")} />

          <div>
            <Label htmlFor="request">Special Request</Label>
            <textarea
              id="request"
              className="h-[100px] w-full rounded-md border border-black text-sm p-2 text-gray-500"
              {...register("request")}
            ></textarea>
          </div>

          <Button
            type="submit"
            variant={"outline"}
            className="w-full rounded-md"
            disabled={!selectedOption}
          >
            Choose
          </Button>
        </div>
      </form>

      <button onClick={() => onReset()}>Back</button>
    </>
  );
};

export const AirportAndLocalTransportation = ({
  onReset,
}: selectionFormProps) => {
  const { setServices } = useStore();
  const { handleSubmit, watch, setValue } = useForm();

  const onSubmit = (data: any) => {
    const [selectedService, selectedPrice] = data.service.split("|");

    if (data && selectedService && selectedPrice) {
      setServices({
        transport: {
          from: data.transportation,
          choice: data.option,
          trip: selectedService,
          price: selectedPrice,
        },
      });
    }
    onReset();
  };

  const selectedOption = watch("option");
  const selectedTransport = watch("transportation");
  const selectedService = watch("service");

  const data = [
    {
      id: 1,
      title: "Airport Transportation",
      transport: [
        {
          name: "Manila International Airport",
          service: [
            {
              title: "Airport Pickup",
              price: 1500,
            },
            { title: "Airport Drop-off", price: 2000 },
            {
              title: "Round-trip Service",
              price: 3200,
            },
          ],
        },
      ],
    },
    {
      id: 2,
      title: "Local Transportation",
      transport: [
        {
          name: "Van",
          service: [
            {
              title: "Home Pickup",
              price: 1500,
            },
            { title: "Home Drop-off", price: 2000 },
            {
              title: "Round-trip Service",
              price: 3200,
            },
          ],
        },
      ],
    },
  ];
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-6 gap-x-4"
      >
        <div className="col-start-2 col-span-2">
          <p>Airport and Local Transportation</p>
        </div>

        {/* Transportation Form */}
        <div className="col-start-4 col-span-2 space-y-4">
          {/* Choose between Airport or Local */}
          <>
            <Label htmlFor="radio">Choose mode of transportation:</Label>

            <RadioGroup
              id="radio"
              onValueChange={(value) => {
                setValue("option", value);
                setValue("service", null);
              }}
              value={selectedOption}
            >
              {data.map((d, i) => (
                <div key={i}>
                  <RadioGroupItem
                    value={`${d.title}`}
                    id={d.title}
                    className="peer hidden"
                  />
                  <Label
                    htmlFor={d.title}
                    className="block w-full cursor-pointer border border-transparent rounded-md bg-gray-50 p-8 font-normal hover:border-black duration-300 peer-aria-checked:border peer-aria-checked:border-black"
                  >
                    <p>{d.title}</p>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </>

          {/* Select Transportation  */}
          {selectedOption && (
            <>
              <Label htmlFor="radio">
                Select{" "}
                {selectedOption === "Airport Transportation"
                  ? "Airport"
                  : "Vehicle"}
                :
              </Label>
              <RadioGroup
                id="radio"
                onValueChange={(value) => setValue("transportation", value)}
                value={selectedTransport}
              >
                {data
                  .find((d) => d.title === selectedOption)
                  ?.transport.map((d, i) => (
                    <div key={i} className="flex items-center">
                      <RadioGroupItem
                        value={`${d.name}`}
                        id={d.name}
                        className="peer hidden"
                      />
                      <Label
                        htmlFor={d.name}
                        className="flex justify-between w-full cursor-pointer border border-transparent rounded-md bg-gray-50 p-8 font-normal hover:border-black duration-300 peer-aria-checked:border peer-aria-checked:border-black"
                      >
                        <p>{d.name}</p>
                      </Label>
                    </div>
                  ))}
              </RadioGroup>

              {/* Select Service Choice */}
              {selectedTransport && (
                <>
                  <div>
                    <Label htmlFor="radio">Select service:</Label>
                    <RadioGroup
                      id="radio"
                      onValueChange={(value) => setValue("service", value)}
                      value={selectedService}
                    >
                      {data
                        .find((d) => d.title === selectedOption)
                        ?.transport.find((t) => t.name === selectedTransport)
                        ?.service.map((d, i) => (
                          <div key={i} className="flex items-center">
                            <RadioGroupItem
                              value={`${d.title}|${d.price}`}
                              id={d.title}
                              className="peer hidden"
                            />
                            <Label
                              htmlFor={d.title}
                              className="flex justify-between w-full cursor-pointer border border-transparent rounded-md bg-gray-50 p-8 font-normal hover:border-black duration-300 peer-aria-checked:border peer-aria-checked:border-black"
                            >
                              <p>{d.title}</p>
                              <p>{d.price}</p>
                            </Label>
                          </div>
                        ))}
                    </RadioGroup>
                  </div>
                </>
              )}
            </>
          )}
          <Button
            type="submit"
            variant={"outline"}
            className="w-full rounded-md"
            disabled={!selectedService}
          >
            Submit
          </Button>
        </div>
      </form>
      <button onClick={() => onReset()}>Back</button>
    </>
  );
};

// export const FamilyAndChildServices = () => {
//   return <div>FamilyAndChildServices</div>;
// };

// export const SpecialOccasionPackage = () => {
//   return <div>SpecialOccasionPackage</div>;
// };

// export const FitnessAndRecreation = () => {
//   return <div>FitnessAndRecreation</div>;
// };

// export const PetService = () => {
//   return <div>PetService</div>;
// };
