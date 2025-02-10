import { Request, Response } from 'express';
import Thought from '../models/Thought.js';
import User from '../models/User.js';

export const getThoughts = async (_req: Request, res: Response): Promise<void> => {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json({ error: err instanceof Error ? err.message : 'Unknown error occurred' });
    }
  };
  
  export const getThoughtById = async (req: Request, res: Response): Promise<void> => {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      if (!thought) {
        res.status(404).json({ message: 'Thought not found' });
        return;
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json({ error: err instanceof Error ? err.message : 'Unknown error occurred' });
    }
  };
  
  export const createThought = async (req: Request, res: Response): Promise<void> => {
    try {
      const thought = await Thought.create(req.body);
      await User.findByIdAndUpdate(
        req.body.userId,
        { $push: { thoughts: thought._id } }
      );
      res.json(thought);
    } catch (err) {
      res.status(500).json({ error: err instanceof Error ? err.message : 'Unknown error occurred' });
    }
  };
  
  export const updateThought = async (req: Request, res: Response): Promise<void> => {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        req.body,
        { new: true }
      );
      if (!thought) {
        res.status(404).json({ message: 'Thought not found' });
        return;
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json({ error: err instanceof Error ? err.message : 'Unknown error occurred' });
    }
  };
  
  export const deleteThought = async (req: Request, res: Response): Promise<void> => {
    try {
      const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
      if (!thought) {
        res.status(404).json({ message: 'Thought not found' });
        return;
      }
      // Remove the thought from the associated user's thoughts array
      await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } }
      );
      res.json({ message: 'Thought deleted' });
    } catch (err) {
      res.status(500).json({ error: err instanceof Error ? err.message : 'Unknown error occurred' });
    }
  };