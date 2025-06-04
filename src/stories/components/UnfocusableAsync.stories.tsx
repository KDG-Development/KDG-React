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
  // First component state (custom duration)
  const [loading1, setLoading1] = useState(false)
  const [focusOutCount1, setFocusOutCount1] = useState(0)
  const [formData1, setFormData1] = useState({ name: '', email: '' })

  // Second component state (custom content)
  const [loading2, setLoading2] = useState(false)
  const [focusOutCount2, setFocusOutCount2] = useState(0)
  const [formData2, setFormData2] = useState({ title: '', description: '' })

  // Third component state (no success overlay)
  const [loading3, setLoading3] = useState(false)
  const [focusOutCount3, setFocusOutCount3] = useState(0)
  const [formData3, setFormData3] = useState({ field: '' })

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

  const handleFormChange3 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData3({ ...formData3, [e.target.name]: e.target.value })
  }

  const handleFocusOut1 = async () => {
    setLoading1(true)
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setLoading1(false)
        setFocusOutCount1(prev => prev + 1)
        resolve()
      }, 1500)
    })
  }

  const handleFocusOut2 = async () => {
    setLoading2(true)
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setLoading2(false)
        setFocusOutCount2(prev => prev + 1)
        resolve()
      }, 1500)
    })
  }

  const handleFocusOut3 = async () => {
    setLoading3(true)
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setLoading3(false)
        setFocusOutCount3(prev => prev + 1)
        resolve()
      }, 1500)
    })
  }

  return (
    <div className="p-4">
      <h4>UnFocusableAsync: Success Overlay Configurations</h4>
      <p className="text-muted">Demonstrates custom duration, custom content, and no success overlay</p>
      <div className="d-flex gap-4">
        {/* Custom duration */}
        <div style={{ width: '350px' }}>
          <p>Custom duration saves: {focusOutCount1}</p>
          <UnFocusableAsync 
            onFocusOut={handleFocusOut1}
            loading={loading1}
            wrapperClassName="border border-primary"
            successConfig={{ duration: 1000 }}
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
        {/* Custom content */}
        <div style={{ width: '350px' }}>
          <p>Custom content saves: {focusOutCount2}</p>
          <UnFocusableAsync 
            onFocusOut={handleFocusOut2}
            loading={loading2}
            wrapperClassName="border border-primary"
            successConfig={{ content: <Image src={logo}/> }}
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
        {/* No success overlay */}
        <div style={{ width: '350px' }}>
          <p>No success overlay saves: {focusOutCount3}</p>
          <UnFocusableAsync 
            onFocusOut={handleFocusOut3}
            loading={loading3}
            wrapperClassName="border border-secondary"
          >
            <div className="p-4" tabIndex={0}>
              <h5>Form Without Success Overlay</h5>
              <form className="d-flex flex-column gap-3">
                <div className="form-group">
                  <label htmlFor="field">Field</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="field" 
                    name="field"
                    value={formData3.field}
                    onChange={handleFormChange3}
                    placeholder="Enter something" 
                  />
                </div>
              </form>
            </div>
          </UnFocusableAsync>
        </div>
      </div>
    </div>
  )
}
