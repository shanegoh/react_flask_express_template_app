import React, { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios';
import { getAccessToken } from '../util'
import Loading from '../component/Loading'

export default function DropdownList({ updateTargetID, departmentList }) {
  const [text, setText] = useState('Not Filtered')

  const handleSelection = (event) => {
    const id = event.target.id - 1
    updateTargetID(id)
    setText((text) => event.target.text)
  }

  return (
    <Dropdown>
      <Dropdown.Toggle variant="light" id="dropdown-basic">
        {text}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item key={0} id={0} onClick={handleSelection}>Not Filtered</Dropdown.Item>
        {
          departmentList.length > 0 ? departmentList.map((department) => {
            return (
              <Dropdown.Item key={department.dept_code + 1} id={department.dept_code + 1} onClick={handleSelection}>{department.name}</Dropdown.Item>
            )
          }) : <></>
        }
      </Dropdown.Menu>
    </Dropdown>

  );
}