import React,{useState} from 'react'
// import ReactChipInput from "react-chip-input";
import dynamic from 'next/dynamic';
// const ReactChipInput = dynamic(() => import("react-chip-input"), { ssr: false })
// import ChipInput from 'material-ui-chip-input'
// import { Stack, Chip } from '@mui/material/Stack';
const Stack = dynamic(()=> import("@mui/material/Stack"), { ssr: false })
const Chip = dynamic(()=> import("@mui/material/Chip"), { ssr: false })
const Avatar = dynamic(() => import("@mui/material/Avatar"), { ssr: false })
// import FaceIcon from "@mui/icons-material/Face"
const FaceIcon = dynamic(()=> import("@mui/icons-material/Face"), { ssr: false })
const MenuBook = dynamic(()=> import("@mui/icons-material/MenuBook"), { ssr: false })
const GTranslate = dynamic(()=> import("@mui/icons-material/GTranslate"), { ssr: false })
const Pen = dynamic(() => import("@mui/icons-material/ModeEdit"), { ssr: false })



const AddBook = () => {
    // const [chipsList, setchipsList] = useState([])
    const [title, setTitle] = useState("")
    const [image, setImage] = useState("")
    const [infoLink, setInfoLink] = useState("")

    const [writerList, setWriterList] = useState(["writer 1", "writer 2", "writer 3"])
    const [writerInput, setWriterInput] = useState("")

    const [translatorList, setTranslatorList] = useState(["translator 1","translator 2","translator 3","translator 4"])
    const [translatorInput, setTranslatorInput] = useState("")

    const [donorList, setDonorList] = useState(["donor 1","donor 2"])
    const [donorInput, setDonorInput] = useState("")

    const handleDeleteWriter = (chipToDelete) => {
        setWriterList(chips => chips.filter(chip => chip !== chipToDelete))
    }
    const handleDeleteTranslator = (chipToDelete) => {
        setTranslatorList(chips => chips.filter(chip => chip !== chipToDelete))
    }
    const handleDeleteDonor = (chipToDelete) => {
        setDonorList(chips => chips.filter(chip => chip !== chipToDelete))
    }

    const handleSubmit = () => {
        console.log({
            title,image,infoLink,writerList,translatorList,donorList
        })

        fetch('http://localhost:8080/api/book/save', {
        method: 'POST',
        body: JSON.stringify(
            {
                title,
                bookImageLink: image,
                bookInfoLink: infoLink,
                writers: writerList,
                donors: donorList,
                translators:translatorList
            }
        ),
        headers: {
            'Content-Type': 'application/json'
        }
        })        
    }

    return (
    <div className='bg-dark'>

            {/* <Stack direction='row' spacing={1}>
                <Chip label='chip' color='warning' size='small' avatar={<Avatar>W</Avatar>} onClick={ ()=>alert("Hi htere")} />
                <Chip label='chip' color='primary' size='small'/>
                <Chip label='chip' color='secondary' size='small' avatar={<Avatar>W</Avatar> } />
                <Chip label='chip' color='success' size='small' icon={<GTranslate />} />
                <Chip label='chip' color='info' size='small' icon={<MenuBook />} />
                <Chip label='chip' color='error' size='small' icon={<FaceIcon />} onDelete={ ()=>alert("delete")} />
            </Stack> */}
            <div className='container my-1' style={{height:'50px',display:'flex',borderRadius:'5px',alignItems:'center'}}>
                <div className="row" >
                    <label className="visually-hidden" htmlFor="inputTitle">Title</label>
                    <div className="col-auto">
                        <input type="text" className="form-control" id="inputTitle" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}  />
                    </div>
                    <div className="col-auto">
                        <label className="visually-hidden" htmlFor="inputImage">bookImageLink</label>
                        <div className="input-group">
                            <div className="input-group-text">Image Link</div>
                            <input type="url" className="form-control" id="inputImage" placeholder="www.image.com" value={image} onChange={(e)=>setImage(e.target.value)} required />
                        </div>
                    </div>
                    <div className="col-auto">
                        <label className="visually-hidden" htmlFor="inputInfoLink">bookInfoLink</label>
                        <div className="input-group">
                            <div className="input-group-text">Info Link</div>
                            <input type="url" className="form-control" id="inputInfoLink" placeholder="www.goodreads.com" value={infoLink} onChange={(e)=>setInfoLink(e.target.value)} required />
                        </div>
                    </div>
                    <div className="col-auto">
                        <button type="submit" className="btn btn-primary" onClick={e=>handleSubmit(e)}>Add Book</button>
                    </div>
                </div>            
            </div>
            <div className='container my-1 bg-dark' style={{height:'50px',display:'flex',borderRadius:'5px',alignItems:'center'}}>
                <div className="row" >
                    <label className="visually-hidden" htmlFor="inputWriter"  >Writer</label>
                    <div className="col-sm-7">
                        <input type="text" className="form-control" id="inputWriter" placeholder="bookInfoLink" value={writerInput} onChange={(e) => setWriterInput(e.target.value)} />
                    </div>
                    <div className="col-sm-5">
                        <button type="button" className="btn" style={{backgroundColor: '#ED6C02',color:'white'}}  onClick={()=>setWriterList([...writerList,writerInput])}>Add Writer</button>
                    </div>                
                </div>            
                <Stack direction='row' spacing={1}>
                    {
                        writerList.map(chip => {
                            return (
                                <Chip key={chip} color='warning' label={chip} onDelete={()=> handleDeleteWriter(chip)} icon={<Pen />}/>
                            )
                        })
                    }
                </Stack>
            </div>
            <div className='container my-1 ' style={{height:'50px',display:'flex',borderRadius:'5px',alignItems:'center'}}>
                <div className="row" >
                    <label className="visually-hidden" htmlFor="inputTranslator"  >Translator</label>
                    <div className="col-sm-7">
                        <input type="text" className="form-control" id="inputTranslator" placeholder="Translator" value={translatorInput} onChange={ (e)=>setTranslatorInput(e.target.value)} />
                    </div>
                    <div className="col-sm-5">
                        <button type="button" className="btn" style={{backgroundColor: '#9C27B0',color:'white'}} onClick={()=>setTranslatorList([...translatorList,translatorInput])}>Add Translator</button>
                    </div>                
                </div>            
                <Stack direction='row' spacing={1}>
                    {
                        translatorList.map(chip => {
                            return (
                                <Chip key={chip} color='secondary' label={chip} onDelete={()=> handleDeleteTranslator(chip)} icon={<GTranslate />}/>
                            )
                        })
                    }
                </Stack>
            </div>
            <div className='container my-1 ' style={{height:'50px',display:'flex',borderRadius:'5px',alignItems:'center'}}>
                <div className="row" >
                    <label className="visually-hidden" htmlFor="inputDonor"  >Donor</label>
                    <div className="col-sm-7">
                        <input type="text" className="form-control" id="inputDonor" placeholder="Donor" value={donorInput} onChange={ (e)=>setDonorInput(e.target.value)} />
                    </div>
                    <div className="col-sm-5">
                        <button type="button" className="btn btn-success" onClick={()=>setDonorList([...donorList,donorInput])}>Add Donor</button>
                    </div>                
                </div>            
                <Stack direction='row' spacing={1}>
                    {
                        donorList.map(chip => {
                            return (
                                <Chip key={chip} color='success' label={chip} onDelete={()=> handleDeleteDonor(chip)} icon={<FaceIcon />}/>
                            )
                        })
                    }
                </Stack>
            </div>
    </div>
      
  )
}

export default AddBook