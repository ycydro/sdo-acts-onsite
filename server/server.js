import express from "express";
import cors from "cors";
import escpos from "escpos";
import escposUSB from "escpos-usb";

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const sleep = async (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

app.post("/api/print", async (req, res) => {
  console.log("hi");
  try {
    const {
      ticket: { ticket_code, service },
    } = req.body;

    const department = service?.department.name;
    const dateTime = new Date();

    const formattedDate = dateTime
      .toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
      .replace(" at ", " ");

    // console.log(print, "TEST");

    // if (!print) {
    //   return res.status(204).json({
    //     success: false,
    //     error: "Nothing to print.",
    //   });
    // }

    escpos.USB = escposUSB;

    let device;
    try {
      device = new escpos.USB();
    } catch (usbError) {
      console.error("USB device not found:", usbError);
      return res.status(500).json({
        success: false,
        message: "Printer not found or not connected.",
      });
    }

    const options = { encoding: "GB18030" };
    const printer = new escpos.Printer(device, options);

    console.log("Attempting to print...");

    console.log("Ticket Code: " + ticket_code);

    device.open(function (error) {
      if (error) {
        console.error("Printer connection failed:", error);
        return res.status(500).json({
          success: false,
          message: "Failed to open printer connection.",
        });
      }

      printer
        .align("ct")
        .font("a")
        .size(2, 2)
        .style("bu")
        .text(ticket_code)
        .text("\n");

      printer
        .align("ct")
        .font("b")
        .size(1, 1)
        .style("normal")
        .text(`Department: ${department}`)
        .text(`Date: ${formattedDate}`)
        .text("\n\n")
        .cut()
        .close();

      return res.status(200).json({ success: true, message: "Printed!" });
    });

    console.log(`Ticket is now printed!`);
  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
