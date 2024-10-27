import React from "react";

function CakelifyGiveawayModal({ isOpen, closeModal }) {
  if (!isOpen) return null; // Don't render if the modal is closed

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-full max-w-lg p-6 shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-3">
          <h2 className="text-lg font-semibold">Cakelify Giveaway Rules</h2>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {/* Coupon Entry */}

        {/* Rules Content */}
        <div className="mt-6 space-y-3">
          <ul className="text-sm text-gray-700 space-y-2">
            <li>
              🍰 <span className="font-semibold">Purchase Requirement</span>:
              Buy a Jar Cake from Cakelify during the giveaway period (Sunday &
              Monday).
            </li>
            <li>
              🎟️ <span className="font-semibold">Coupon Inside</span>: Only
              selected Jar Cakes contain a hidden coupon that qualifies for a
              movie ticket.
            </li>
            <li>
              📲 <span className="font-semibold">Instagram Story</span>: Post a
              photo of your Jar Cake on your Instagram story. Tag @Cakelify
            </li>
            <li>
              🔑 <span className="font-semibold">Coupon Validation</span>: DM us
              your coupon code on Instagram to validate your prize.
            </li>
            <li>
              👥 <span className="font-semibold">Follow Us</span>: Follow
              @Cakelify on Instagram to stay updated with giveaway news.
            </li>
            <li>
              🎬 <span className="font-semibold">Movie Ticket Details</span>:
              Winners get tickets for "Venom: The Last Dance" at Cinepolis on
              Tuesday.
            </li>
            <li>
              🏆 <span className="font-semibold">Winner Announcement</span>:
              Winners will be announced on Monday night via Instagram stories.
            </li>
            <li>
              ⏳ <span className="font-semibold">Event Duration</span>: Only
              valid on Sunday and Monday. Entries close Monday night.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CakelifyGiveawayModal;
