import React, { useState } from 'react'
import { UnFocusableAsync } from '../../components/Unfocusable'
import { Meta } from '@storybook/react';
import logo from '.././assets/kdg-logo.png'
import { Image } from '../../components';

export default {
  component: UnFocusableAsync,
  title:'Components/UnfocusableAsync',
  args:{}
} satisfies Meta<typeof UnFocusableAsync>;


export const Component = () => {
  // First component state
  const [loading1, setLoading1] = useState(false)
  const [focusOutCount1, setFocusOutCount1] = useState(0)
  const [formData1, setFormData1] = useState({ name: '', email: '' })

  // Second component state
  const [loading2, setLoading2] = useState(false)
  const [focusOutCount2, setFocusOutCount2] = useState(0)
  const [formData2, setFormData2] = useState({ title: '', description: '' })

  const handleFormChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData1({
      ...formData1,
      [e.target.name]: e.target.value
    })
  }

  const handleFormChange2 = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData2({
      ...formData2,
      [e.target.name]: e.target.value
    })
  }

  const handleFocusOut1 = async () => {
    // Simulate saving form data
    setLoading1(true)
    
    // Simulate async operation
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setLoading1(false)
        setFocusOutCount1(prev => prev + 1)
        console.log('Form 1 data saved:', formData1)
        resolve()
      }, 1500)
    })
  }

  const handleFocusOut2 = async () => {
    // Simulate saving form data
    setLoading2(true)
    
    // Simulate async operation
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setLoading2(false)
        setFocusOutCount2(prev => prev + 1)
        console.log('Form 2 data saved:', formData2)
        resolve()
      }, 1500)
    })
  }

  return (
    <div className="p-4">
      <h4>Auto-saving forms with UnfocusableAsync</h4>
      <p className="text-muted">Forms auto-save when you click outside after changing data</p>
      <div className="d-flex gap-3">
        <div>
          <p>Basic form saves: {focusOutCount1}</p>
          
          <div className="my-4" style={{ width: '400px' }}>
            <UnFocusableAsync 
              onFocusOut={handleFocusOut1}
              loading={loading1}
              wrapperClassName="border border-primary"
              successDuration={1000}
            >
              <div className="p-4" tabIndex={0}>
                <h5>User Information Form</h5>
                <form className="d-flex flex-column gap-3">
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="name" 
                      name="name"
                      value={formData1.name}
                      onChange={handleFormChange1}
                      placeholder="Enter your name" 
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      id="email" 
                      name="email"
                      value={formData1.email}
                      onChange={handleFormChange1}
                      placeholder="Enter your email" 
                    />
                  </div>
                </form>
              </div>
            </UnFocusableAsync>
          </div>
        </div>
        
        <div>
          <p>Content form saves: {focusOutCount2}</p>
          
          <div className="my-3" style={{ width: '400px' }}>
            <UnFocusableAsync 
              onFocusOut={handleFocusOut2}
              loading={loading2}
              wrapperClassName="border border-primary"
              successContent={<Image src={logo}/>}
            >
              <div className="p-4" tabIndex={0}>
                <h5>Content Editor</h5>
                <form className="d-flex flex-column gap-3">
                  <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="title" 
                      name="title"
                      value={formData2.title}
                      onChange={handleFormChange2}
                      placeholder="Enter content title" 
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea 
                      className="form-control" 
                      id="description" 
                      name="description"
                      value={formData2.description}
                      onChange={handleFormChange2}
                      rows={3}
                      placeholder="Enter content description" 
                    />
                  </div>
                </form>
              </div>
            </UnFocusableAsync>
          </div>
        </div>
      </div>
    </div>
  )
}
