
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
import processNumber from "@/utils/processNumber"

import { useEffect, useState } from "react"

export default function AddGroupModal({ show, setShow, groups, setGroups, group }) {
    const [groupName, setGroupName] = useState('')
    const [groupOrder, setGroupOrder] = useState('')
    const [sphericalLowerLimit, setSphericalLowerLimit] = useState(0)
    const [sphericalUpperLimit, setSphericalUpperLimit] = useState(0)
    const [sphericalLowerLimitPowerType, setSphericalLowerLimitPowerType] = useState('+')
    const [sphericalUpperLimitPowerType, setSphericalUpperLimitPowerType] = useState('+')
    const [cylindricalLowerLimit, setCylindricalLowerLimit] = useState(0)
    const [cylindricalUpperLimit, setCylindricalUpperLimit] = useState(0)
    const [cylindricalLowerLimitPowerType, setCylindricalLowerLimitPowerType] = useState('+')
    const [cylindricalUpperLimitPowerType, setCylindricalUpperLimitPowerType] = useState('+')
    const [additionalPowerLowerLimit, setAdditionalPowerLowerLimit] = useState(0)
    const [additionalPowerUpperLimit, setAdditionalPowerUpperLimit] = useState(0)
    const [additionalPowerLowerLimitPowerType, setAdditionalPowerLowerLimitPowerType] = useState('+')
    const [additionalPowerUpperLimitPowerType, setAdditionalPowerUpperLimitPowerType] = useState('+')
    const [type, setType] = useState('Progressive')
    const [loading, setLoading] = useState(false)


    console.log(processNumber(group?.cylindricalUpperLimit)[1])

    useEffect(() => {
        setGroupName(group?.groupName || "")
        setGroupOrder(group?.groupOrder || "")
        setSphericalLowerLimit(processNumber(group?.sphericalLowerLimit)[1] || 0)
        setSphericalUpperLimit(processNumber(group?.sphericalUpperLimit)[1] || 0)
        setSphericalLowerLimitPowerType(processNumber(group?.sphericalLowerLimit)[0] || "+")
        setSphericalUpperLimitPowerType(processNumber(group?.sphericalUpperLimit)[0] || "+")
        setCylindricalLowerLimit( processNumber(group?.cylindricalLowerLimit)[1] || 0)
        setCylindricalUpperLimit( processNumber(group?.cylindricalUpperLimit)[1] || 0)
        setCylindricalLowerLimitPowerType(processNumber(group?.cylindricalLowerLimit)[0] || "+")
        setCylindricalUpperLimitPowerType(processNumber(group?.cylindricalUpperLimit)[0] || "+")
        setAdditionalPowerLowerLimit(processNumber(group?.additionalPowerLowerLimit)[1] || 0)
        setAdditionalPowerUpperLimit(processNumber(group?.additionalPowerUpperLimit)[1] || 0)
        setAdditionalPowerLowerLimitPowerType(processNumber(group?.additionalPowerLowerLimit)[0] || "+")
        setAdditionalPowerUpperLimitPowerType(processNumber(group?.additionalPowerUpperLimit)[0] || "+")
        setType(group?.type)

    }, [group])

    const data = {
        groupName,
        groupOrder,
        sphericalLowerLimit: Number(sphericalLowerLimitPowerType+sphericalLowerLimit),
        sphericalUpperLimit: Number(sphericalUpperLimitPowerType+sphericalUpperLimit),
        cylindricalLowerLimit: Number(cylindricalLowerLimitPowerType+cylindricalLowerLimit),
        cylindricalUpperLimit: Number(cylindricalUpperLimitPowerType+cylindricalUpperLimit),
        additionalPowerLowerLimit : Number(additionalPowerLowerLimitPowerType+additionalPowerLowerLimit),
        additionalPowerUpperLimit: Number(additionalPowerUpperLimitPowerType+additionalPowerUpperLimit) ,
        ...((additionalPowerLowerLimit && Number(additionalPowerLowerLimit) > 0) || (additionalPowerUpperLimit && Number(additionalPowerUpperLimit) > 0) ? { type } : {}),
    }


    const resetForm = () => {
        setGroupName("")
        setGroupOrder("")
        setSphericalLowerLimit(0)
        setSphericalUpperLimit(0)
        setSphericalLowerLimitPowerType("+")
        setSphericalUpperLimitPowerType("+")
        setCylindricalLowerLimit(0)
        setCylindricalUpperLimit(0)
        setCylindricalLowerLimitPowerType("+")
        setCylindricalUpperLimitPowerType("+")
        setAdditionalPowerLowerLimit(0)
        setAdditionalPowerUpperLimit(0)
        setAdditionalPowerLowerLimitPowerType("+")
        setAdditionalPowerUpperLimitPowerType("+")
    }
    const createGroup = async () => {
        try {
            setLoading(true)
            if (!group) {
                const res = await fetch('/api/group', {
                    method: "POST",
                    body: JSON.stringify(data),
                    cache: 'no-store'
                })
                const result = await res.json()
                console.log(result)
                if (res.ok) {
                    setGroups(pv => [...pv, result.data])
                    resetForm()
                    setShow(false)
                    toast({
                        title: "Success",
                        description: result.Message,
                        variant: "success",
                        className: 'top-0 right-0 flex fixed md:max-w-[300px] md:top-4 md:right-4'
                    })

                }
                return
            }
            const res = await fetch(`/api/group/?id=${group?._id}`, {
                method: "PUT",
                body: JSON.stringify(data),
                cache: 'no-store'
            })
            const result = await res.json()
    
            if (res.ok) {
                setGroups(pv => pv.map(el => {
                    if (el._id === result.data._id) {
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
                    <DialogTitle>{group ? "Edit" : "Create"} Group</DialogTitle>


                </DialogHeader>
                <>
                    <div className='flex gap-4 justify-center items-center'>
                        <Label>Group Name</Label><Input className="max-w-[100px]" type='text' value={groupName} onChange={(e) => setGroupName(e.target.value)} />
                    </div>
                    <div className='flex gap-4 justify-center items-center'>
                        <Label>Group Order</Label><Input className="max-w-[100px]" type='text' value={groupOrder} onChange={(e) => setGroupOrder(e.target.value)} />
                    </div>
                    <div className='flex gap-4 justify-center items-center'>
                        <Label>Spherical Lower Limit</Label>
                        <Select value={sphericalLowerLimitPowerType} onValueChange={(value) => setSphericalLowerLimitPowerType(value)}>
                            <SelectTrigger id="area" className="!w-24">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent className="!w-24">
                                <SelectItem value="-">-</SelectItem>
                                <SelectItem value="+">+</SelectItem>

                            </SelectContent>
                        </Select>

                        <Input value={sphericalLowerLimit} onChange={(e) => setSphericalLowerLimit(e.target.value)} className="max-w-[100px]" type='number' max={8} />
                    </div>
                    <div className='flex gap-4 justify-center items-center'>
                        <Label>Spherical Upper Limit</Label>  <Select value={sphericalUpperLimitPowerType} onValueChange={(value) => setSphericalUpperLimitPowerType(value)}>
                            <SelectTrigger id="area" className="!w-24">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent className="!w-12">
                                <SelectItem value="-">-</SelectItem>
                                <SelectItem value="+">+</SelectItem>

                            </SelectContent>
                        </Select>
                        <Input value={sphericalUpperLimit} onChange={(e) => setSphericalUpperLimit(e.target.value)} className="max-w-[100px]" type='number' max={8} />
                    </div>
                    <div className='flex gap-4 justify-center items-center'>
                        <Label>Cylindrical Lower Limit</Label>   <Select value={cylindricalLowerLimitPowerType} onValueChange={(value) => setCylindricalLowerLimitPowerType(value)}>
                            <SelectTrigger id="area" className="!w-24">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent className="!w-12">
                                <SelectItem value="-">-</SelectItem>
                                <SelectItem value="+">+</SelectItem>

                            </SelectContent>
                        </Select>
                        <Input value={cylindricalLowerLimit} onChange={(e) => setCylindricalLowerLimit(e.target.value)} className="max-w-[100px]" type='number' max={8} />
                    </div>
                    <div className='flex gap-4 justify-center items-center'>
                        <Label>Cylindrical Upper Limit</Label>  <Select value={cylindricalUpperLimitPowerType} onValueChange={(value) => setCylindricalUpperLimitPowerType(value)}>
                            <SelectTrigger id="area" className="!w-24">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent className="!w-12">
                                <SelectItem value="-">-</SelectItem>
                                <SelectItem value="+">+</SelectItem>

                            </SelectContent>
                        </Select><Input value={cylindricalUpperLimit} onChange={(e) => setCylindricalUpperLimit(e.target.value)} className="max-w-[100px]" type='number' max={8} />
                    </div>

                    <div className='flex gap-4 justify-center items-center'>
                        <Label>AdditionalPower Lower Limit</Label>  <Select value={additionalPowerLowerLimitPowerType} onValueChange={(value) => setAdditionalPowerLowerLimitPowerType(value)}>
                            <SelectTrigger id="area" className="!w-24">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent className="!w-12">
                                <SelectItem value="-">-</SelectItem>
                                <SelectItem value="+">+</SelectItem>

                            </SelectContent>
                        </Select><Input value={additionalPowerLowerLimit} onChange={(e) => setAdditionalPowerLowerLimit(e.target.value)} className="max-w-[100px]" type='number' max={8} />
                    </div>
                    <div className='flex gap-4 justify-center items-center'>
                        <Label>AdditionalPower Upper Limit</Label>  <Select value={additionalPowerUpperLimitPowerType} onValueChange={(value) => setAdditionalPowerUpperLimitPowerType(value)}>
                            <SelectTrigger id="area" className="!w-24">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent className="!w-12">
                                <SelectItem value="-">-</SelectItem>
                                <SelectItem value="+">+</SelectItem>

                            </SelectContent>
                        </Select><Input value={additionalPowerUpperLimit} onChange={(e) => setAdditionalPowerUpperLimit(e.target.value)} className="max-w-[100px]" type='number' max={8} />
                    </div>

                    {((additionalPowerLowerLimit && Number(additionalPowerLowerLimit) > 0) || (additionalPowerUpperLimit && Number(additionalPowerUpperLimit) > 0)) ? <div className='flex gap-4 justify-center items-center'>
                        <Label>Type</Label>
                        <Select value={type} onValueChange={(value) => setType(value)}>
                            <SelectTrigger id="area" className="!w-24">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent className="!w-12">
                                <SelectItem value="Progressive">Progressive</SelectItem>
                                <SelectItem value="Bifocal">Bifocal</SelectItem>

                            </SelectContent>
                        </Select>
                    </div>:null}
                </>
                <DialogFooter>
                    <Button className="relative" onClick={createGroup} >
                        {group ? "Edit" : "Create"} Group

                        {loading && <div class="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
                            <div class="border-t-transparent border-solid animate-spin  rounded-full border-white border-[3px] h-6 w-6"></div>
                        </div>}

                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}




