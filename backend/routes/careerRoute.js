// // routes/messageRoutes.js
// const express = require("express");
// const Message = require("../models/Message");

import express from "express";
import Message from "../models/careerModel.js";

const router = express.Router();

// POST /api/messages
router.post("/messages", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      phone,
      email,
      address,
      age,
      qualification,
      about,
      language,
    } = req.body;
    const message = new Message({
      firstName,
      lastName,
      phone,
      email,
      address,
      age,
      qualification,
      about,
      language,
    });
    await message.save();
    res.status(201).json({ message: "Message saved successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
