
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,

} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { useEffect, useState } from "react"
// show = { showAddPackageModal } setShow = { setShowAddPackageModal } packages = { packages } setPackages = { setPackages } pack = { pack }

export default function AddPackageModal({ show, setShow, packages, setPackages, pack }) {
    const [packageName, setPackageName] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setPackageName(pack?.packageName || "")
    }, [pack])

    const data = {packageName}



    const resetForm = () => {
        setPackageName("")
       
    }
    const createPackage = async () => {
        try {
            setLoading(true)
            if (!pack) {
               console.log(data)
                const res = await fetch('/api/package', {
                    method: "POST",
                    body: JSON.stringify(data),
                    cache: 'no-store'
                })
                const result = await res.json()
                console.log(result)
                if (res.ok) {
                    setPackages(pv => [...pv, result.data])
                    resetForm()
                    setShow(false)
                    toast({
                        title: "Success",
                        description: result.Message,
                        variant: "success",
                        className: 'top-0 right-0 flex fixed md:max-w-[300px] md:top-4 md:right-4'
                    })

                }

                if (!res.ok && (res.status === 400 || res.status === 409)) {
                    resetForm()
                    setShow(false)
                    toast({
                        title: "Error",
                        description: Array.isArray(result.message) ? result.message.map((el, index) => <p key={index}>{el}</p>) : result.message,
                        variant: "destructive",
                        className: 'top-0 right-0 flex fixed md:max-w-[300px] md:top-4 md:right-4'
                    })
                    return

                }
                if (!res.ok) {
                    resetForm()
                    setShow(false)
                    toast({
                        title: "Error",
                        description: 'Something went wrong',
                        variant: "destructive",
                        className: 'top-0 right-0 flex fixed md:max-w-[300px] md:top-4 md:right-4'
                    })
                    return

                }
                return
            }
            const res = await fetch(`/api/package/?id=${pack?._id}`, {
                method: "PUT",
                body: JSON.stringify(data),
                cache: 'no-store'
            })
            const result = await res.json()

            if (res.ok) {
                setPackages(pv => pv.map(el => {
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
            if (!res.ok && (res.status === 400 || res.status === 409)) {
                resetForm()
                setShow(false)
                toast({
                    title: "Error",
                    description: Array.isArray(result.message) ? result.message.map((el, index) => <p key={index}>{el}</p>) : result.message,
                    variant: "destructive",
                    className: 'top-0 right-0 flex fixed md:max-w-[300px] md:top-4 md:right-4'
                })
                return

            }
            if (!res.ok) {
                resetForm()
                setShow(false)
                toast({
                    title: "Error",
                    description: 'Something went wrong',
                    variant: "destructive",
                    className: 'top-0 right-0 flex fixed md:max-w-[300px] md:top-4 md:right-4'
                })
                return

            }


        } catch (error) {
            toast({
                title: "Error",
                description: 'Something went wrong',
                variant: "destructive",
                className: 'top-0 right-0 flex fixed md:max-w-[300px] md:top-4 md:right-4'
            })
        } finally {
            setLoading(false)
        }

    }

    return (
        <Dialog open={show} onOpenChange={setShow} >
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{pack ? "Edit" : "Create"} Package</DialogTitle>


                </DialogHeader>
  
                    <div className='flex gap-4 justify-center items-center'>
                        <Label>Package Name</Label><Input className="max-w-[200px]" type='text' value={packageName} onChange={(e) => setPackageName(e.target.value)} />
                    </div>

                <DialogFooter>
                    <Button className="relative" onClick={createPackage} >
                        {pack ? "Edit" : "Create"} Package

                        {loading && <div class="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
                            <div class="border-t-transparent border-solid animate-spin  rounded-full border-white border-[3px] h-6 w-6"></div>
                        </div>}

                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}




