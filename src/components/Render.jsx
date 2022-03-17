import React, { useState, useEffect } from 'react'
import Member from './Member'
import Form from './Form'

function Render() {
  const [reactMembers, setReactMembers] = useState([
    {
      name: 'Quyen',
      age: 16
    },
    {
      name: 'Long',
      age: 15
    },
    {
      name: 'cham dat',
      age: 18
    }
  ])
  const [javaMembers, setJavaMembers] = useState([
    {
      name: 'thanh nam',
      age: 26
    },
    {
      name: 'bk dat',
      age: 25
    },
    {
      name: 'datnt',
      age: 30
    }
  ])


  const [formData, setFormData] = useState({
    name: '',
    age: '',
    classType: 'react'
  })

  const [searchName,setSearchName] = useState('')

  const SORT = {
    NO:0,
    UP:1,
    DOWN:2
  }
  const [sortAge,setSortAge] = useState(SORT.NO)

  const transferReactToJava = (index) => {
    const el = reactMembers[index]
    reactMembers.splice(el, 1)
    javaMembers.push(el)
    setJavaMembers([...javaMembers])
    setReactMembers([...reactMembers])
  }

  const transferJavatToReact = (index) => {
    const el = javaMembers[index]
    javaMembers.splice(el, 1)
    reactMembers.push(el)
    setJavaMembers([...javaMembers])
    setReactMembers([...reactMembers])

  }


  useEffect(() => {
    if (reactMembers.length === 0) {
      alert('reactMember empty')
    } else if (javaMembers.length === 0) {
      alert('javamember Empty')
    }
  }, [reactMembers.length, javaMembers.length])


  const submitInput = (data) => {
    if (data.classType === 'react') {
      reactMembers.push(data)
      setReactMembers([...reactMembers])
    } else {
      javaMembers.push(data)
      setJavaMembers([...javaMembers])
    }
  }

  const onEditReactMember = (index) => {
    setFormData({
      ...reactMembers[index],
      isEdit: true,
      originClassType: reactMembers[index].classType
    })
  }

  const onEditJavaMember = (index) => {
    setFormData({
      ...javaMembers[index],
      isEdit: true,
      originClassType: javaMembers[index].classType
    })
  }

  const getUsers = (list) => { 
    let res = [...list]
    if(searchName){
      res = res.filter(item => item.name.includes(searchName))
    }
    if(sortAge !== SORT.NO){
      res.sort((a,b) =>{
        if(sortAge === SORT.UP){
          return parseInt(a.age) - parseInt(b.age)
        }else{
          return parseInt(b.age) - parseInt(a.age)
        }
      })
    }

    return res
   }


  const getSortText = () => { 
    if(sortAge === SORT.NO){
      return 'no'
    }else if(sortAge === SORT.UP){
      return 'up'
    }else{
      return 'down'
    }

   }

   const handleSort = () => { 
     if(sortAge === SORT.DOWN){
       setSortAge(SORT.NO)
     }else if (sortAge === SORT.UP){
      setSortAge(SORT.DOWN)
     }else{
       setSortAge(SORT.UP)
     }
    }

  return (

    <div>
      <h1>Search By Name</h1>
      <input type="text" value={searchName} onChange = {(e)=> setSearchName(e.target.value)} />
      <br></br>
      <span>Sort :</span>
      <button onClick={handleSort}> {getSortText()}</button>
      <h1>React List</h1>
      {reactMembers.length !== 0 ? getUsers(reactMembers).map((member, index) => {
        return <Member key={index} handleEdit={() => onEditReactMember(index)} name={member.name} age={member.age} index={index} handleTransfer={transferReactToJava} />
      }) : <p>Empty class</p>}

      <h1>Java List</h1>
      {javaMembers.length !== 0 ? getUsers(javaMembers).map((member, index) => {
        return <Member key={index} handleEdit={() => onEditJavaMember(index)} name={member.name} age={member.age} index={index} handleTransfer={transferJavatToReact} />
      }) : <p>Empty class</p>}

      <Form onSubmit={submitInput} formData={formData} setFormData={setFormData} />
    </div>

  )
}

export default Render