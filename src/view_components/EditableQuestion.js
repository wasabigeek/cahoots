import React, { useState } from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input, Card, CardTitle, Button, Spinner, FormGroup, Label } from 'reactstrap';
import saveQuestion from '../use_cases/saveQuestion';

const STATE_DEFAULT = 'default';
const STATE_SAVING = 'saving';


export const EditableQuestion = ({ question }) => {
  const [draftQuestion, setDraftQuestion] = useState(question)
  const [componentState, setComponentState] = useState(STATE_DEFAULT);

  const updateDraft = (newAttributes) => {
    setDraftQuestion(Object.assign({}, draftQuestion, newAttributes));
  }

  return (
    <div>
      <Card body className="mt-4 mb-4">
        <CardTitle>
          <InputGroup className="mb-2">
            <Input
              type="textarea"
              placeholder="Question text"
              value={draftQuestion.text || ''}
              onChange={e => updateDraft({ text: e.target.value })}
            />
          </InputGroup>
        </CardTitle>
        {['answerA', 'answerB', 'answerC', 'answerD'].map((ansKey) => (
          <InputGroup key={ansKey} className="mb-2">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>{ansKey}</InputGroupText>
            </InputGroupAddon>
            <Input
              placeholder="Answer"
              value={ansKey in draftQuestion ? draftQuestion[ansKey] : ''}
              onChange={e => updateDraft({[ansKey]: e.target.value})}
            />
          </InputGroup>
        ))}
        <FormGroup>
          <Label for="correctAnswerDropdown">Correct Answer</Label>
          <Input
            type="select"
            name="correctAnswer"
            id="correctAnswerDropdown"
            data-testid="correctAnswerDropdown"
            value={draftQuestion.correctAnswer || 'A'}
            onChange={e => updateDraft({ correctAnswer: e.target.value })}
          >
            <option>A</option>
            <option>B</option>
            <option>C</option>
            <option>D</option>
          </Input>
        </FormGroup>
        {componentState === STATE_SAVING ?
          <Button disabled color="primary" className="mt-4">
            <Spinner type="grow" size="sm" color="info" className="mr-2" />
            Saving...
          </Button>
          :
          <Button
            color="primary"
            className="mt-4"
            onClick={() => {
              setComponentState(STATE_SAVING);
              saveQuestion(draftQuestion).then(() => setComponentState(STATE_DEFAULT));
            }}
          >
            Save
          </Button>
        }
      </Card>
    </div>
  );
};
