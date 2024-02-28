import React, { useCallback, useEffect, useState } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link } from "@nextui-org/react";
import { BiDish } from "react-icons/bi";
import { IoIosPricetag } from "react-icons/io";
import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { useUploadThing } from "@/utils/uploadthing";
import { IoIosAddCircleOutline } from "react-icons/io";
import { createMeal } from '@/lib/actions/meal.actions';
import { Meal } from '@/lib/database/models/meal';
import { Card, CardBody, CardFooter, Image, Skeleton } from "@nextui-org/react";


const DishGallery = ({ onGetMealIds, onGetAmount }: { onGetMealIds: (mealIds: string[]) => void, onGetAmount: (amount: number) => void }) => {
    const [mealIds, setMealIds] = useState<string[]>([]);
    const [meals, setMeals] = useState<Meal[]>([]);
    const [name, setName] = useState<string>("");
    const [quantity, setQuantity] = useState<number>(0);
    const [price, setPrice] = useState<number>(0);
    const [files, setFiles] = useState<File[]>([]);
    const [curImageUrl, setCurImageUrl] = useState("")

    useEffect(() => {
        // 计算 amount
        const newAmount = meals.reduce((total, meal) => total + (meal.price * meal.quantity), 0);
        onGetAmount(newAmount);
        // 将 mealIds 和 amount 传递给父组件
        onGetMealIds(mealIds);
    }, [mealIds, meals, onGetMealIds, onGetAmount]);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        console.log("acceptedFiles", acceptedFiles);
        if (acceptedFiles.length > 1) {
            alert("You can only upload one image at a meal.");
        } else {
            if (curImageUrl) {
                URL.revokeObjectURL(curImageUrl);
            }
            let url = URL.createObjectURL(acceptedFiles[0]);
            setCurImageUrl(url);
            setFiles(acceptedFiles);
        }
    }, [curImageUrl]);

    const { startUpload, permittedFileInfo } = useUploadThing(
        "imageUploader",
        {
            onClientUploadComplete: (res) => {
                console.log("onClientUploadComplete", res);
                console.log("uploaded successfully!");
            },
            onUploadError: (e) => {

                console.log("error occurred while uploading");
                console.log(e);

            },
            onUploadBegin: () => {
                console.log("upload has begun");
            },
        },
    );

    const fileTypes = permittedFileInfo?.config
        ? Object.keys(permittedFileInfo?.config)
        : [];

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
    });

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const handleSave = async () => {
        let newMeal = {
            name: name,
            quantity: quantity,
            price: price,
            image: "loading"
        }
        setMeals([...meals, newMeal]);

        let filesResponse = await startUpload(files);
        console.log("filesResponse", filesResponse);

        if (filesResponse !== undefined) {
            let createdMeal = await createMeal({
                name,
                quantity,
                price,
                image: filesResponse[0].url,
            })
            setMeals((meals) =>
                meals.map(meal =>
                    meal.name === newMeal.name ? createdMeal : meal
                )
            );
            setMealIds([...mealIds, createdMeal._id]);
            console.log("createdMeal", createdMeal);
        } else {
            // 上传失败时移除之前添加的newMeal
            setMeals(meals.filter(meal => meal.name !== newMeal.name));
        }
    }

    const clearMealData = () => {
        setName("");
        setQuantity(0);
        setPrice(0);
        setCurImageUrl("");
        URL.revokeObjectURL(curImageUrl);
    }

    return (
        <>
            <div className='flex flex-col gap-5  p-5 bg-default-600 rounded-xl items-start justify-start' >
                <h1 className='font-extrabold text-3xl'>添加饭</h1>
                <div className="flex gap-4">
                    {meals.map((meal, index) => (
                        <Card shadow="sm" key={index} isPressable onPress={() => console.log("item pressed")}>
                            <CardBody className="overflow-visible p-0 h-32">
                                <Image
                                    shadow="sm"
                                    radius="lg"
                                    width="100%"
                                    alt={meal.name}
                                    className="w-full object-cover h-[140px]"
                                    src={meal.image}
                                />
                            </CardBody>
                            <CardFooter className="text-small justify-between">
                                <b>{meal.name}</b>
                                <p className="text-default-500">{meal.price} X {meal.quantity}</p>
                            </CardFooter>
                        </Card>
                    ))}
                    <Card shadow="sm" isPressable onPress={onOpen}>
                        <CardBody className="w-28 h-36 flex justify-center items-center">
                            <IoIosAddCircleOutline className='size-16' />
                        </CardBody>
                    </Card>
                </div>
            </div>
            {/* 弹出的卡片 */}
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">加个菜</ModalHeader>
                            <ModalBody>
                                <Input
                                    autoFocus
                                    endContent={
                                        <BiDish />
                                    }
                                    label="Name"
                                    placeholder="Enter your meal name"
                                    variant="bordered"
                                    onValueChange={setName}
                                    value={name}
                                />
                                <Input
                                    label="Quantity"
                                    placeholder="Enter your quantity"
                                    type="number"
                                    variant="bordered"
                                    onValueChange={(e) => setQuantity(Number(e))}
                                    value={String(quantity)}
                                />
                                <Input
                                    endContent={
                                        <IoIosPricetag />
                                    }
                                    label="Price"
                                    placeholder="Enter your price"
                                    type="number"
                                    variant="bordered"
                                    onValueChange={(e) => setPrice(Number(e))}
                                    value={String(price)}
                                />
                                <div {...getRootProps()} className='flex justify-center items-center size-20 rounded-lg bg-content2' >
                                    <input {...getInputProps()} />
                                    {/* 添加图片和显示图片 */}
                                    {
                                        curImageUrl === "" ? (
                                            <div>
                                                <IoIosAddCircleOutline className='size-10' />
                                            </div>
                                        ) : (
                                            <div>
                                                <Image src={curImageUrl} alt="curImageUrl" className='object-cover object-center rounded-lg size-20' width={80} height={80} />
                                            </div>
                                        )
                                    }
                                </div>

                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={() => {
                                    onClose()
                                    clearMealData()
                                }}>
                                    Close
                                </Button>
                                <Button color="primary"
                                    onPress={() => {
                                        onClose();
                                        handleSave();
                                        clearMealData()
                                    }}>
                                    Save
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

export default DishGallery