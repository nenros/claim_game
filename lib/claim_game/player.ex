defmodule ClaimGame.Player do
  defstruct [:name, :position, :uuid]

  defimpl Jason.Encoder, for: ClaimGame.Player do
    def encode(value, opts) do
      player = Map.take(value, [:name, :uuid])
      {x, y} = value.position
      player = Map.put(player, :position, [x, y])
      Jason.Encode.map(player, opts)
    end
  end
end
