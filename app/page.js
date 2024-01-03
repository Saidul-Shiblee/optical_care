

'use client'

import { useEffect, useState } from "react"
import AddGroupModal from "./_component/Group/AddGroupModal"
import { Button } from "@/components/ui/button"
import GroupLoadingSkeleton from "./_component/Group/GroupLoadingSkeleton"
import { RiDeleteBin5Fill } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import AddPackageModal from "./_component/package/AddPackageModal"
import PackageLoadingSkeleton from "./_component/package/PackageLoadingSkeleton"
import AddLensModal from "./_component/lens/AddLensModal"
import AddPriceModal from "./_component/Price/AddPriceModal"
import { useSession } from "next-auth/react"
import {  useRouter } from "next/navigation"
import Logo from '../public/logo.png'
import Image from "next/image"
import { signOut } from "next-auth/react"
import processNumber from "@/utils/processNumber"


export default function Home() {

  const {data:session} = useSession()
  const router=useRouter()



  const handleLogout=()=>{
    signOut({ redirect: true,callbackUrl: 'http://localhost:3000/login' })

   
  }
  const [groups, setGroups] = useState([])
  const [packages, setPackages] = useState([])
  const [lenses, setLenses] = useState([])
  const [prices, setPrices] = useState([])
  const [showAddGroupModal, setShowAddGroupModal] = useState(false)
  const [showAddPackageModal, setShowAddPackageModal] = useState(false)
  const [showAddLensModal, setShowAddLensModal] = useState(false)
  const [showAddPriceModal, setShowAddPriceModal] = useState(false)
  const [l1, setl1] = useState(false)
  const [l2, setl2] = useState(false)
  const [l3, setl3] = useState(false)
  const [l4, setl4] = useState(false)
  const [group, setGroup] = useState(null)
  const [pack, setPack] = useState(null)
  const [lens, setLens] = useState(null)
  const [price, setPrice] = useState(null)

  useEffect(()=>{
    if (!showAddGroupModal){
      setGroup(null)
    }
    if (!showAddPackageModal){
      setPack(null)
    }
    if (!showAddLensModal){
      setLens(null)
    }
    if (!showAddPriceModal){
      setPrice(null)
    }
  }, [showAddGroupModal, showAddPackageModal, showAddLensModal, showAddPriceModal])
  





  useEffect(() => {
    const getGroups = async () => {
      setl1(true)
      const res = await fetch('/api/group')
      const data = await res.json()
      if (res.ok) {
        setGroups(data?.data)
        setl1(false)
      }
    }

    getGroups()
  }, [])
  useEffect(() => {
    const getPackages = async () => {
      setl1(true)
      const res = await fetch('/api/package')
      const data = await res.json()
      if (res.ok) {
        setPackages(data?.data)
        setl2(false)
      }
    }

    getPackages()
  }, [])
  useEffect(() => {
    const getLenses = async () => {
      setl3(true)
      const res = await fetch('/api/lens')
      const data = await res.json()
      if (res.ok) {
        setLenses(data?.data)
        setl3(false)
      }
    }

    getLenses()
  }, [])


  useEffect(() => {
    const getPrices = async () => {
      setl4(true)
      const res = await fetch('/api/price')
      const data = await res.json()
      if (res.ok) {
        setPrices(data?.data)
        setl4(false)
      }
    }
    getPrices()
  }, [])


  const handleDelete=async(id,endpoint)=>{
    try {
      const res = await fetch(`/api/${endpoint}/?id=${id}`, {
        method: "DELETE",
        cache: 'no-store'
      })
      const result = await res.json()
      if (res.ok) {
        if (endpoint ='group')
        setGroups(pv => pv.filter(el=>el._id!==id))
        if (endpoint ='package')
        setPackages(pv => pv.filter(el=>el._id!==id))
        if (endpoint ='lens')
        setLenses(pv => pv.filter(el=>el._id!==id))
        if (endpoint ='price')
        setPrices(pv => pv.filter(el=>el._id!==id))
      }


    } catch (error) {
      console.log(error)
    }
  }


  if (!session) {
   return null
  }

  return (


    <div className="flex w-full">
      <div className="flex bg-black w-[20%]  py-20 flex-col text-white fixed h-screen">

        <div className="flex flex-col justify-center items-center space-x-2">
          <div className='w-12 h-12 relative overflow-hidden'>
            <Image src={Logo} alt="logo" fill className='absolute rounded-full ' />
          </div>
          <p> Hello! Admin</p>
          <p className="text-sm">{session.user.email}</p>  
         
        </div>
        <div className="py-10 ">
          <p className="w-full py-2 text-black text-center bg-white font-semibold cursor-pointer">Dashboard</p>
        </div>
        <div className="mt-auto flex justify-center">
          <p onClick={() => handleLogout()} className=" cursor-pointer">Logout</p>  
        </div>
        


      </div>
      <div className="flex min-h-screen flex-col gap-4 p-24 items-start w-[80%] ml-[20%]">
        <div
          className="w-full p-8  flex flex-col border border-1 rounded-md gap-4 shadow"
        >
          <div className="flex justify-between">
            <h3 className="text-xl font-semibold">Mange Groups</h3>
            <Button onClick={() => {
              setGroup(null)
              setShowAddGroupModal(true)

            }} >Add Group</Button>
          </div>
          {l1 ? <div className="flex flex-col gap-4">
            <GroupLoadingSkeleton />
            <GroupLoadingSkeleton />
          </div> : <div className="grid grid-cols-3 gap-4">
            {groups.length === 0 && <div> No group added yet</div>}
            {groups.map(el => <div className="flex flex-col border p-2 rounded-md" key={el._id}>
              <div className="flex justify-between items-center"> <h6 className="text-xl font-semibold">Group-{el.groupName}</h6>
                <div className="flex justify-center items-center gap-2">
                  <RiDeleteBin5Fill
                    onClick={() => handleDelete(el._id, 'group')}

                    className="w-6 h-6 text-gray-600 hover:text-black active:scale-95" />
                  <TiEdit onClick={() => {
                    setGroup(el)
                    setShowAddGroupModal(true)


                  }}
                    className="w-7 h-7 text-gray-600 hover:text-black active:scale-95" />
                </div>
              </div>
              <div>
                <p> Spherical:{" " +processNumber(el.sphericalLowerLimit)[0] + " " + processNumber(el.sphericalLowerLimit)[1] + " "}to{" " + processNumber(el.sphericalUpperLimit)[0] + " " + processNumber(el.sphericalUpperLimit)[1]}</p>
                <p> Cylindrical: {" " + processNumber(el.cylindricalLowerLimit)[0] + " " + processNumber(el.cylindricalLowerLimit)[1] + " "}to{" " + processNumber(el.cylindricalUpperLimit)[0] + " " + processNumber(el.cylindricalUpperLimit)[1] + " "} </p>
                <p> Axis:Any</p>
                <p> Add:{el.additionalPowerLowerLimit ? " " + processNumber(el.additionalPowerLowerLimit)[0] + " " + processNumber(el.additionalPowerLowerLimit)[1] + " " + "to" + " " +  processNumber(el.additionalPowerUpperLimit)[0] + " " + processNumber(el.additionalPowerUpperLimit)[1] : 0}</p>
                {el.type && <p> Type:{el.type}</p>}
              </div>
            </div>)}
          </div>}
          <AddGroupModal show={showAddGroupModal} setShow={setShowAddGroupModal} groups={groups} setGroups={setGroups} group={group} />

        </div>


        <div
          className="w-full p-8  flex flex-col border border-1 rounded-md gap-4 shadow"
        >
          <div className="flex justify-between">
            <h3 className="text-xl font-semibold">Manage Package</h3>
            <Button onClick={() => {
              setPack(null)
              setShowAddPackageModal(true)

            }} >Add Package</Button>
          </div>
          {l2 ? <div className="flex flex-col gap-4">
            <PackageLoadingSkeleton />

          </div> : <div className="grid grid-cols-3 gap-4">
            {packages.length === 0 && <div> No group added yet</div>}
            {packages.map(el => <div className="flex flex-col border p-2 rounded-md" key={el._id}>
              <div className="flex justify-between items-center"> <h6 className="text-xl font-semibold">{el?.packageName}</h6>
                <div className="flex justify-center items-center gap-2">
                  <RiDeleteBin5Fill
                    onClick={() => handleDelete(el._id, "package")}

                    className="w-6 h-6 text-gray-600 hover:text-black active:scale-95" />
                  <TiEdit onClick={() => {
                    setPack(el)
                    setShowAddPackageModal(true)


                  }}
                    className="w-7 h-7 text-gray-600 hover:text-black active:scale-95" />
                </div>
              </div>

            </div>)}
          </div>}
          <AddPackageModal show={showAddPackageModal} setShow={setShowAddPackageModal} packages={packages} setPackages={setPackages} pack={pack} />

        </div>


        <div
          className="w-full p-8  flex flex-col border border-1 rounded-md gap-4 shadow"
        >
          <div className="flex justify-between">
            <h3 className="text-xl font-semibold">Manage Lens</h3>
            <Button onClick={() => {
              setLens(null)
              setShowAddLensModal(true)

            }} >Add Lens</Button>
          </div>
          {l3 ? <div className="flex flex-col gap-4">
            <PackageLoadingSkeleton />

          </div> : <div className="grid grid-cols-3 gap-4">
            {lenses?.length === 0 && <div> No lens added yet</div>}
            {lenses?.map(el => <div className="flex flex-col border p-2 rounded-md" key={el._id}>
              <div className="flex justify-between items-center"> <h6 className="text-xl font-semibold">{el?.lensName}</h6>
                <div className="flex justify-center items-center gap-2">
                  <RiDeleteBin5Fill
                    onClick={() => handleDelete(el._id, "lens")}

                    className="w-6 h-6 text-gray-600 hover:text-black active:scale-95" />
                  <TiEdit onClick={() => {
                    setLens(el)
                    setShowAddLensModal(true)


                  }}
                    className="w-7 h-7 text-gray-600 hover:text-black active:scale-95" />
                </div>
              </div>

            </div>)}
          </div>}
          <AddLensModal show={showAddLensModal} setShow={setShowAddLensModal} lenses={lenses} setLenses={setLenses} lens={lens} />

        </div>
        <div
          className="w-full p-8  flex flex-col border border-1 rounded-md gap-4 shadow"
        >
          <div className="flex justify-between">
            <h3 className="text-xl font-semibold">Manage Price</h3>
            <Button onClick={() => {
              setGroup(null)
              setShowAddPriceModal(true)

            }} >Add Price</Button>
          </div>
          {l4 ? <div className="flex flex-col gap-4">
            <GroupLoadingSkeleton />
            <GroupLoadingSkeleton />
          </div> : <div className="grid grid-cols-3 gap-4">
            {prices.length === 0 && <div> No price added yet</div>}
            {prices.map(el => <div className="flex flex-col border p-2 rounded-md" key={el._id}>
              <div className="flex justify-between items-center"> <h6 className="text-xl font-semibold">{el?.groupIdentifier}</h6>
                <div className="flex justify-center items-center gap-2">
                  <RiDeleteBin5Fill
                    onClick={() => handleDelete(el._id, 'price')}

                    className="w-6 h-6 text-gray-600 hover:text-black active:scale-95" />
                  <TiEdit onClick={() => {
                    setPrice(el)
                    setShowAddPriceModal(true)


                  }}
                    className="w-7 h-7 text-gray-600 hover:text-black active:scale-95" />
                </div>
              </div>
              <div>
                <p> Group Name:{el?.group?.groupName}</p>
                <p> Lense Type: {el?.lenseType?.lensName} </p>
                <p> Package:{el?.package?.packageName}</p>
                <p> Lense Price:SAR-{el?.lensePrice}</p>
                {el?.rimlessAvailable && <p> Rimless Available:Yes</p>}
                {el?.rimlessAvailable && <p> Rimless Price:SAR-{el?.rimlessPrice}</p>}
                {el?.attributes && <p> Attributes:{el?.attributes}</p>}
                {el?.rimlessAttributes && <p>Rimless Attributes:{el?.rimlessAttributes}</p>}
                {el?.remarks && <p> Remarks:{el?.remarks}</p>}
              </div>
            </div>)}
          </div>}
          <AddPriceModal show={showAddPriceModal} setShow={setShowAddPriceModal} prices={prices} setPrices={setPrices} price={price} groups={groups} lenses={lenses} packages={packages} />

        </div>



      </div>

    </div>

  )
}


