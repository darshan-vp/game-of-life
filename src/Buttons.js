import React from 'react'
import {Button, ButtonToolbar, Dropdown, DropdownButton } from 'react-bootstrap'

export const Buttons = (props) => {

    const handleSelect = (e) => {
        props.gridSize(e)
    }


    return (
        <div className="center">
            <ButtonToolbar>
                <Button variant="light" onClick={props.playButton}>Play</Button>
                <Button variant="light" onClick={props.pauseButton}>Pause</Button>
                <Button variant="light" onClick={props.clear}>Clear</Button>
                <Button variant="light" onClick={props.slow}>Slow</Button>
                <Button variant="light" onClick={props.fast}>Fast</Button>
                <Button variant="light" onClick={props.seed}>Seed</Button>

            <DropdownButton
            title="Grid Size"
            id="size-menu"
            onSelect={handleSelect}
            >
                <Dropdown.Item eventKey="1">20x10</Dropdown.Item>
                <Dropdown.Item eventKey="2">50x30</Dropdown.Item>
                <Dropdown.Item eventKey="3">70x50</Dropdown.Item>

            </DropdownButton>
            </ButtonToolbar>
        </div>
    )
}
