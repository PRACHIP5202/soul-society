import React, { useState } from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export function SubjectTopicForm() {
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("medium");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement form submission logic
    console.log("Submitted:", { subject, topic, difficulty });
    setSubject("");
    setTopic("");
    setDifficulty("medium");
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div>
        <Label htmlFor='subject'>Subject</Label>
        <Input
          id='subject'
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder='Enter subject name'
          required
        />
      </div>
      <div>
        <Label htmlFor='topic'>Topic</Label>
        <Input
          id='topic'
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder='Enter topic name'
          required
        />
      </div>
      <div>
        <Label htmlFor='difficulty'>Difficulty</Label>
        <Select value={difficulty} onValueChange={setDifficulty}>
          <SelectTrigger id='difficulty'>
            <SelectValue placeholder='Select difficulty' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='easy'>Easy</SelectItem>
            <SelectItem value='medium'>Medium</SelectItem>
            <SelectItem value='hard'>Hard</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type='submit'>
        <PlusCircle className='mr-2 h-4 w-4' /> Add Subject/Topic
      </Button>
    </form>
  );
}
