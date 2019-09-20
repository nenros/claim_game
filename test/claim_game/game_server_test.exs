defmodule ClaimGame.GameServerTest do
  use ExUnit.Case

  alias ClaimGame.GameServer

  @moduletag :capture_log

  doctest GameServer

  test "module exists" do
    assert is_list(GameServer.module_info())
  end
end
