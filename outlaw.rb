OUTLAW_VERSION = ''

class Outlaw < Formula
  desc ""
  homepage ""
  url "https://github.com/hooroo/outlaw/releases/download/#{OUTLAW_VERSION}/outlaw"
  version OUTLAW_VERSION
  sha256 "1aa1b1483ad8ff0eb25af239e67c8c729ef74060eea5460ac1733965f4db08ba"

  depends_on 'docker'
  depends_on 'docker-machine'

  def install
    bin.install 'outlaw'
  end

  def post_install
    system "outlaw", "install"
  end

  test do
    system "outlaw", "-h"
  end
end
