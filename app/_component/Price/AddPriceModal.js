
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,

} from "@/components/ui/dialog"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

import { useEffect, useState } from "react"

export default function AddPriceModal({ show,
    setShow,
    prices,
    setPrices,
    price,
    groups,
    lenses,
    packages, }) {
    const [groupsName, setGroupsName] = useState("")
    const [lensesName, setLensesName] = useState("")
    const [packagesName, setPackagesName] = useState("")
    const [lensePrice, setLensePrice] = useState("")
    const [rimlessFramePrice, setRimlessFramePrice] = useState("")
    const [attributes, setAttributes] = useState("")
    const [rimlessAttributes, setRimlessAttributes] = useState("")
    const [rimlessAvailable, setRimlessAvailable] = useState(false)
    const [remarks, setRemarks] = useState("")
    const [loading, setLoading] = useState("")

        console.log(price)
    useEffect(() => {
        setGroupsName(price?.group?._id+ "-" +price?.group?.groupName || "")
        setLensesName(price?.lenseType?._id + "-" +price?.lenseType?.lensName || "")
        setPackagesName(price?.package?._id + "-" +price?.package?.packageName || "")
        setLensePrice(price?.lensePrice || "")
        setAttributes(price?.attributes || "")
        setRimlessAvailable(price?.rimlessAvailable || false)
        setRimlessFramePrice(price?.rimlessPrice || "")
        setRimlessAttributes(price?.rimlessAttributes || "")
        setRemarks(price?.remarks || "")

    }, [price])

    const data = {
        lenseType:lensesName?.split("-")[0],
        group: groupsName?.split("-")[0],
        package:  packagesName?.split("-")[0],
        lensePrice: lensePrice,
        groupIdentifier: groupsName?.split("-")[1] + "_" + lensesName?.split("-")[1] + "_" +packagesName?.split("-")[1] ,
        attributes:attributes,
        rimlessAvailable: rimlessAvailable,
        ...(!rimlessAvailable ?{remarks: remarks}:{}),
        ...(rimlessAvailable ? { rimlessAttributes: rimlessAttributes } : {}),
        ...(rimlessAvailable ? { rimlessPrice: rimlessFramePrice } : {})
    }

console.log(data)

    const resetForm = () => {
        setGroupsName("")
        setLensesName("")
        setPackagesName("")
        setLensePrice("")
        setRimlessFramePrice("")
        setAttributes("")
        setRemarks("")
        setLoading("")
    }
    const createGroup = async () => {
        try {
            setLoading(true)
            if (!price) {
             
                const res = await fetch('/api/price', {
                    method: "POST",
                    body: JSON.stringify(data),
                    cache: 'no-store'
                })
                const result = await res.json()
                if (res.ok) {
                    const res1 = await fetch('/api/price')
                    const data = await res1.json()
                    if (res1.ok) {
                        setPrices(data?.data)
                        resetForm()
                        setShow(false)
                        toast({
                            title: "Success",
                            description: result.Message,
                            variant: "success",
                            className: 'top-0 right-0 flex fixed md:max-w-[300px] md:top-4 md:right-4'
                        })
                    }
                }
                return
            }
            const res = await fetch(`/api/price/?id=${price?._id}`, {
                method: "PUT",
                body: JSON.stringify(data),
                cache: 'no-store'
            })
            const result = await res.json()

            if (res.ok) {
                setPrices(pv => pv.map(el => {
                    console.log(result)
                    if (el._id === result?.data?._id) {
                        return result.data
                    }
                    return el
                }))
                resetForm()
                setShow(false)
                toast({
                    title: "Success",
                    description: result.Message,
                    variant: "success",
                    className: 'top-0 right-0 flex fixed md:max-w-[300px] md:top-4 md:right-4'
                })

            }


        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }

    }



    return (
        <Dialog open={show} onOpenChange={setShow} >
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{price ? "Edit" : "Create"} Price Group</DialogTitle>


                </DialogHeader>
                <>

                    <div className='flex gap-4 justify-center items-center'>
                        <Label className='w-[30%]'>Lense Type</Label>
                        <Select value={lensesName} onValueChange={(value) => setLensesName(value)}>
                            <SelectTrigger id="area" >
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent >

                                {
                                    lenses.map(el=>{
                                        return <SelectItem value={el?._id + "-" + el?.lensName}>{el?.lensName}</SelectItem>
                                    })
                                }
                                

                            </SelectContent>
                        </Select>


                    </div>
                    <div className='flex gap-4 justify-center items-center'>
                        <Label  className='w-[30%]'>Group</Label>  
                            <Select value={groupsName} onValueChange={(value) => setGroupsName(value)}>
                                <SelectTrigger id="area" >
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent >

                                    {
                                        groups.map(el => {
                                            return <SelectItem value={el?._id + "-" + el?.groupName}>{el?.groupName}</SelectItem>
                                        })
                                    }


                                </SelectContent>
                            </Select>
                      

                    </div>
                    <div className='flex gap-4 justify-center items-center'>
                        <Label  className='w-[30%]'>Package</Label>   <Select value={packagesName} onValueChange={(value) => setPackagesName(value)}>
                            <SelectTrigger id="area" >
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent >
                                {
                                    packages.map(el => {
                                        return <SelectItem value={el?._id + "-" + el?.packageName}>{el?.packageName}</SelectItem>
                                    })
                                }

                            </SelectContent>
                        </Select>
                       
                    </div>
                    <div className='flex gap-4 justify-center items-center'>
                        <Label  className='w-[30%]'>Lense Price</Label> <Input value={lensePrice} onChange={(e) => setLensePrice(e.target.value)}  type='number' min={0} />
                    </div>
                
                    <div className='flex gap-4 justify-center items-center'>
                        <Label  className='w-[30%]'>Attributes</Label> <Input value={attributes} onChange={(e) => setAttributes(e.target.value)}   />
                    </div>
                    <div className='flex gap-4 justify-center items-center'>
                        <Label className='w-[30%]'>Rimless Available</Label>
                        <Select value={rimlessAvailable} onValueChange={(value) => setRimlessAvailable(value)}>
                            <SelectTrigger id="area" >
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent >
                                <SelectItem value={true}>Yes</SelectItem>
                                <SelectItem value={false}>No</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>


                   { 
                   
                        rimlessAvailable&&
                   <>
                   <div className='flex gap-4 justify-center items-center'>
                        <Label className='w-[30%]'>Rimless Price</Label> <Input value={rimlessFramePrice} onChange={(e) => setRimlessFramePrice(e.target.value)} type='number' min={0} />
                    </div>
                    <div className='flex gap-4 justify-center items-center'>
                        <Label className='w-[30%]'>Rimless Attributes</Label> <Input value={rimlessAttributes} onChange={(e) => setRimlessAttributes(e.target.value)} type='text'  />
                    </div>
                    </>
                    
                    }

                    {
                        !rimlessAvailable &&  <div className='flex gap-4 justify-center items-center'>
                        <Label  className='w-[30%]'>Remarks</Label> <Input value={remarks} onChange={(e) => setRemarks(e.target.value)}   />
                    </div>}

                </>
                <DialogFooter>
                    <Button className="relative" onClick={createGroup} >
                        {price ? "Edit" : "Create"}

                        {loading && <div class="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
                            <div class="border-t-transparent border-solid animate-spin  rounded-full border-white border-[3px] h-6 w-6"></div>
                        </div>}

                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}




